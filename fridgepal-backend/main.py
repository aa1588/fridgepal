from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import FridgeItem
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

# In-memory database
db: List[FridgeItem] = []

# ✅ Get only active (non-deleted) items
@app.get("/items", response_model=List[FridgeItem])
def get_items():
    return [item for item in db if not item.deleted]

# ✅ Get soft-deleted (trashed) items
@app.get("/trash", response_model=List[FridgeItem])
def get_trashed_items():
    return [item for item in db if item.deleted]

# ✅ Add a new item
@app.post("/items", response_model=FridgeItem)
def add_item(item: FridgeItem):
    db.append(item)
    return item

# ✅ Update an existing item
@app.put("/items/{item_id}", response_model=FridgeItem)
def update_item(item_id: int, updated: FridgeItem):
    for i, item in enumerate(db):
        if item.id == item_id:
            db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Item not found")

# ✅ Soft delete (mark as deleted)
@app.delete("/items/{item_id}")
def soft_delete_item(item_id: int):
    for item in db:
        if item.id == item_id:
            item.deleted = True
            return {"message": "Item moved to trash"}
    raise HTTPException(status_code=404, detail="Item not found")
