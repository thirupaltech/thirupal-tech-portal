import { Sprout, Tractor, Package, Wallet } from "lucide-react";

export const featureCards = [
  {
    slug: "crop-planner",
    title: "Crop Planner",
    description: "Seasonal crop recommendations, land fit, soil, water, and yield planning.",
    icon: Sprout,
    accent: "bg-[#edf9f1] border-[#d8eedc]",
    button: "Plan crop"
  },
  {
    slug: "cost-profit",
    title: "Cost & Profit",
    description: "Compare costs, estimate yield value, and calculate the expected profit.",
    icon: Wallet,
    accent: "bg-[#f2f9ff] border-[#d5e8f9]",
    button: "Calculate"
  },
  {
    slug: "sell-produce",
    title: "Sell Produce",
    description: "List fresh harvests and connect with nearby buyers through the marketplace.",
    icon: Package,
    accent: "bg-[#fff7ec] border-[#f5e4be]",
    button: "View listings"
  },
  {
    slug: "equipment-services",
    title: "Equipment & Services",
    description: "Hire tractors, tools, transport, and crop support services from the village network.",
    icon: Tractor,
    accent: "bg-[#eefaf9] border-[#d7eee9]",
    button: "Explore services"
  }
] as const;

export const soilOptions = ["Red Soil", "Black Soil", "Loamy Soil", "Sandy Soil"];
export const waterOptions = ["Limited", "Moderate", "Abundant"];
export const durationOptions = ["3-4 months", "4-6 months", "6-8 months"];

export const cropGuide = [
  {
    soil: "Red Soil",
    water: "Limited",
    duration: "3-4 months",
    crops: ["Groundnut", "Millet", "Tomato"],
    note: "Best for compact farms with lower irrigation and shorter harvest cycles."
  },
  {
    soil: "Red Soil",
    water: "Moderate",
    duration: "4-6 months",
    crops: ["Tomato", "Chilli", "Onion"],
    note: "Strong option for medium farming cycles and regular market demand."
  },
  {
    soil: "Black Soil",
    water: "Abundant",
    duration: "4-6 months",
    crops: ["Cotton", "Maize", "Soybean"],
    note: "Rich soil supports high-yield crops with steady irrigation support."
  },
  {
    soil: "Black Soil",
    water: "Moderate",
    duration: "3-4 months",
    crops: ["Groundnut", "Turmeric", "Sorghum"],
    note: "A practical and resilient mix for seasonal village farming."
  },
  {
    soil: "Loamy Soil",
    water: "Abundant",
    duration: "6-8 months",
    crops: ["Rice", "Sugarcane", "Vegetables"],
    note: "Ideal for nutrient-rich, productive fields with strong moisture retention."
  },
  {
    soil: "Sandy Soil",
    water: "Limited",
    duration: "3-4 months",
    crops: ["Millet", "Groundnut", "Bajra"],
    note: "Choose drought-tolerant crops and schedule irrigation carefully."
  }
];

export const produceListings = [
  {
    product: "Tomato",
    farmer: "Ramesh",
    location: "Local Village",
    quantity: "2,000 KG",
    price: "₹20/KG",
    harvest: "18 Sep",
    tag: "Fresh harvest"
  },
  {
    product: "Turmeric",
    farmer: "Anitha",
    location: "Green Fields",
    quantity: "1,200 KG",
    price: "₹45/KG",
    harvest: "22 Sep",
    tag: "High demand"
  },
  {
    product: "Chilli",
    farmer: "Suresh",
    location: "Nallur",
    quantity: "900 KG",
    price: "₹35/KG",
    harvest: "26 Sep",
    tag: "Local pickup"
  }
];

export const equipmentServices = [
  { title: "Tractor Available", rate: "₹1,200 / hour", location: "Nearby Village", label: "Request Service" },
  { title: "Harvester Support", rate: "₹2,400 / day", location: "Paddy Belt", label: "Book now" },
  { title: "Sprayer Rental", rate: "₹450 / day", location: "Village Hub", label: "Reserve" },
  { title: "Ploughing Service", rate: "₹800 / acre", location: "North Farm Cluster", label: "Schedule" }
];
