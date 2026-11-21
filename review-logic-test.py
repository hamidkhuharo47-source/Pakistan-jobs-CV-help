from datetime import date, timedelta

today = date.today()

record = {
    "last_seen": (today - timedelta(days=31)).isoformat(),
    "status": "Unverified"
}

last_seen = date.fromisoformat(record["last_seen"])

if today - last_seen >= timedelta(days=30):
    record["status"] = "Needs Review"
elif not record.get("status"):
    record["status"] = "Unverified"

print("Test result:", record["status"])
