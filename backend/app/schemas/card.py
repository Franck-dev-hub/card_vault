from pydantic import BaseModel
from typing import Optional

class NormalizedCard(BaseModel):
    card_id: str           # ID de la carte dans l'API
    api_id: str            # Source de l'API (pokemon, magic)
    set_name: Optional[str]
    set_id: Optional[str]
    card_number: Optional[str]
    license: Optional[str]
    illustrator: Optional[str]
    image_url: Optional[str]
    name: Optional[str]
    rarity: Optional[str]
    variant: Optional[str]
    condition: Optional[str]