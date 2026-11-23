from datetime import datetime

from sqlalchemy.orm import Session

from backend.app.config import settings
from backend.app.models.schemas import Cooperative, Manufacturer, MaterialListing, User
from backend.app.services.auth import hash_password

DEMO_PASSWORD = "Demo12345"

COOPERATIVES = [
    ("Abahuzamugambi Cooperative", "Musanze", True),
    ("Twongere Cooperative", "Huye", True),
    ("Dukore Cooperative", "Nyagatare", True),
    ("Ubumwe Cooperative", "Rubavu", True),
    ("Terimbere Cooperative", "Kicukiro", False),  # left pending so the administrator can verify it
]
MANUFACTURERS = [("Kigali Foods Ltd", "Food processing", "Kicukiro"),
                 ("Rwanda Oils Co.", "Edible oils", "Rwamagana"),
                 ("Huye Mills", "Flour milling", "Huye")]

LISTINGS = [
    (0, "Maize", "Cereal", 1200, 450), (0, "Irish potatoes", "Tuber", 900, 350),
    (0, "Beans", "Legume", 60, 800), (0, "Sorghum", "Cereal", 400, 420),
    (1, "Soybeans", "Legume", 80, 900), (1, "Maize", "Cereal", 700, 460),
    (1, "Cassava flour", "Flour", 0, 600), (1, "Coffee cherries", "Coffee", 300, 1200),
    (2, "Sunflower seeds", "Oilseed", 640, 700), (2, "Maize", "Cereal", 2500, 430),
    (2, "Sorghum", "Cereal", 1500, 410), (2, "Beans", "Legume", 350, 780),
    (3, "Soybeans", "Legume", 500, 880), (3, "Sunflower seeds", "Oilseed", 90, 720),
    (3, "Irish potatoes", "Tuber", 1100, 340), (3, "Maize", "Cereal", 800, 470),
    (4, "Maize", "Cereal", 300, 440), (4, "Beans", "Legume", 200, 790),
    (4, "Coffee cherries", "Coffee", 150, 1250), (4, "Cassava flour", "Flour", 450, 590),
]
