from concurrent.futures import ThreadPoolExecutor, as_completed
import base64
import json
import os
from pathlib import Path
import tomllib
import urllib.request

workspace = Path(__file__).resolve().parents[2] / ".stitch" / "balda-backoffice"
pointer = workspace / "current"
if not pointer.is_file():
    raise SystemExit("Run task backoffice:stitch:capture first")
root = workspace / pointer.read_text().strip()
project = "projects/4792710364374043045"
url = "https://stitch.googleapis.com/v1/" + project + "/screens:batchCreate"
key = os.environ.get("STITCH_API_KEY")
if not key:
    config = Path(os.environ.get("CODEX_HOME", Path.home()/".codex"))/"config.toml"
    key = tomllib.loads(config.read_text())["mcp_servers"]["stitch"]["http_headers"]["X-Goog-Api-Key"]
rows = json.loads((root/"routes.json").read_text())
for row in rows:
    if not (root/"screens"/row["File"]).is_file():
        raise SystemExit("Run Playwright capture before upload")
journal = root/"uploaded.json"
done = json.loads(journal.read_text()) if journal.exists() else {}
def upload(batch):
    requests = []
    for row in batch:
        html = (root/"screens"/row["File"]).read_bytes()
        screen = {"title": row["Route"], "htmlCode": {"fileContentBase64": base64.b64encode(html).decode(), "mimeType": "text/html"}, "generatedBy": "stitch::extract-static-html", "screenType": "DOCUMENT", "isCreatedByClient": True}
        requests.append({"screen": screen})
    payload = {"parent": project, "requests": requests, "createScreenInstances": True}
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={"X-Goog-Api-Key":key, "Content-Type":"application/json"})
    with urllib.request.urlopen(req,timeout=420) as res:
        data = json.load(res)
    if data.get("error"):
        raise RuntimeError(data["error"])
    return [row["Route"] for row in batch], data

pending = [row for row in rows if row["Route"] not in done]
batch_size = 3
with ThreadPoolExecutor(max_workers=4) as pool:
    futures = [pool.submit(upload, pending[i:i+batch_size]) for i in range(0,len(pending),batch_size)]
    for future in as_completed(futures):
        try:
            routes, response = future.result()
        except Exception as exc:
            for f in futures:
                f.cancel()
            raise
        with (root/"receipts.jsonl").open("a") as log:
            log.write(json.dumps({"routes":routes,"response":response})+"\n")
        created = {item["screen"]["title"]: item["screen"]["name"] for item in response["results"] if "screen" in item}
        if set(created) != set(routes):
            raise RuntimeError(f"Stitch returned an incomplete batch for {routes}. See receipts.jsonl.")
        done.update(created)
        journal.with_suffix(".tmp").write_text(json.dumps(done,indent=2))
        journal.with_suffix(".tmp").replace(journal)
        print(f"{len(done)}/{len(rows)}",flush=True)
