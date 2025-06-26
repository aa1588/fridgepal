from pydantic import BaseModel

class FridgeItem(BaseModel):
    id: int
    name: str
    quantity: int
    expiry: str
    category: str
    deleted: bool = False  
