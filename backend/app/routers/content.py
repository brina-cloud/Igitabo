from fastapi import APIRouter

router = APIRouter(prefix="/api/content", tags=["content"])

CATEGORIES =["Cereal", "Legume", "Oilseed", "Flour", "Coffee", "Tuber", "Other"]
LOCATIONS = ["Gasabo", "Kicukiro", "Nyarugenge", "Musanze", "Gicumbi", "Huye", "Muhanga", "Nyanza", "Nyagatare", "Rwamagana", "Kayonza", "Rusizi", "Karongi"]
GUIDE = [
    {"title": "Register", "steps": ["Choose Cooperative or Manufacturer", "Fill in your details", "Create account"]},
    {"title": "Add materials (cooperatives)", "steps": ["Save your profile", "Add a listing with quantity and price","Wait for the administrator to verify you"]},
    {"title": "Send a request (manufacturers)", "steps": ["Search or match suppliers", "Press Send request","Track the status under My requests"]},
    {"title": "Respond (cooperatives)", "steps": ["Open Requests", "Accept or reject each pending request"]},
]

                                                        