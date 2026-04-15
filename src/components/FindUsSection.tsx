"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy-load map to avoid SSR issues with Leaflet
const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-2xl bg-cream-dark" />
  ),
});

interface Location {
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

const locations: Location[] = [
  // DALLAS (60)
  { name: "Whole Foods Market - Uptown", city: "Dallas", state: "TX", lat: 32.8012, lng: -96.8005 },
  { name: "Whole Foods Market - Park Lane", city: "Dallas", state: "TX", lat: 32.8680, lng: -96.7700 },
  { name: "Whole Foods Market - Preston Royal", city: "Dallas", state: "TX", lat: 32.8730, lng: -96.7990 },
  { name: "Whole Foods Market - Lakewood", city: "Dallas", state: "TX", lat: 32.8220, lng: -96.7500 },
  { name: "Whole Foods Market - Victory Park", city: "Dallas", state: "TX", lat: 32.7890, lng: -96.8100 },
  { name: "Central Market - Lovers Lane", city: "Dallas", state: "TX", lat: 32.8470, lng: -96.7760 },
  { name: "Central Market - Preston Road", city: "Dallas", state: "TX", lat: 32.8900, lng: -96.8030 },
  { name: "Eatzi's Market & Bakery - Oak Lawn", city: "Dallas", state: "TX", lat: 32.8100, lng: -96.8120 },
  { name: "Eatzi's Market - Preston Forest", city: "Dallas", state: "TX", lat: 32.8860, lng: -96.8010 },
  { name: "Royal Blue Grocery - Downtown", city: "Dallas", state: "TX", lat: 32.7830, lng: -96.7970 },
  { name: "Royal Blue Grocery - Highland Park", city: "Dallas", state: "TX", lat: 32.8350, lng: -96.7950 },
  { name: "Royal Blue Grocery - Knox", city: "Dallas", state: "TX", lat: 32.8200, lng: -96.7920 },
  { name: "Jimmy's Food Store", city: "Dallas", state: "TX", lat: 32.8170, lng: -96.7600 },
  { name: "Rudolph's Market", city: "Dallas", state: "TX", lat: 32.8030, lng: -96.8230 },
  { name: "Scardello Artisan Cheese", city: "Dallas", state: "TX", lat: 32.8090, lng: -96.8180 },
  { name: "Deep Ellum Community Market", city: "Dallas", state: "TX", lat: 32.7850, lng: -96.7830 },
  { name: "Dallas Farmers Market", city: "Dallas", state: "TX", lat: 32.7780, lng: -96.7920 },
  { name: "White Rock Farmers Market", city: "Dallas", state: "TX", lat: 32.8400, lng: -96.7200 },
  { name: "Kalachandji's Restaurant", city: "Dallas", state: "TX", lat: 32.7900, lng: -96.7700 },
  { name: "Mudsmith Coffee", city: "Dallas", state: "TX", lat: 32.8110, lng: -96.7880 },
  { name: "Houndstooth Coffee - Sylvan", city: "Dallas", state: "TX", lat: 32.7710, lng: -96.8530 },
  { name: "Houndstooth Coffee - Henderson", city: "Dallas", state: "TX", lat: 32.8170, lng: -96.7730 },
  { name: "Weekend Coffee", city: "Dallas", state: "TX", lat: 32.8000, lng: -96.8200 },
  { name: "Cultivar Coffee", city: "Dallas", state: "TX", lat: 32.7870, lng: -96.7840 },
  { name: "Stupid Good Coffee", city: "Dallas", state: "TX", lat: 32.7920, lng: -96.7780 },
  { name: "Ascension Coffee - Design District", city: "Dallas", state: "TX", lat: 32.7930, lng: -96.8270 },
  { name: "La La Land Kind Cafe - Knox", city: "Dallas", state: "TX", lat: 32.8210, lng: -96.7940 },
  { name: "La La Land Kind Cafe - Deep Ellum", city: "Dallas", state: "TX", lat: 32.7840, lng: -96.7810 },
  { name: "The Nourished Table", city: "Dallas", state: "TX", lat: 32.7550, lng: -96.8260 },
  { name: "Unrefined Bakery - Lake Highlands", city: "Dallas", state: "TX", lat: 32.8800, lng: -96.7300 },
  { name: "Unrefined Bakery - Preston Hollow", city: "Dallas", state: "TX", lat: 32.8700, lng: -96.8100 },
  { name: "True Food Kitchen - NorthPark", city: "Dallas", state: "TX", lat: 32.8680, lng: -96.7700 },
  { name: "Flower Child - Knox", city: "Dallas", state: "TX", lat: 32.8230, lng: -96.7930 },
  { name: "HG Sply Co - Greenville", city: "Dallas", state: "TX", lat: 32.8260, lng: -96.7690 },
  { name: "HG Sply Co - Lower Greenville", city: "Dallas", state: "TX", lat: 32.8180, lng: -96.7710 },
  { name: "The Gem - Deep Ellum", city: "Dallas", state: "TX", lat: 32.7860, lng: -96.7820 },
  { name: "Natura Apothecary", city: "Dallas", state: "TX", lat: 32.8050, lng: -96.8160 },
  { name: "Whole Body Wellness", city: "Dallas", state: "TX", lat: 32.8150, lng: -96.8080 },
  { name: "Pressed Juicery - Highland Park", city: "Dallas", state: "TX", lat: 32.8340, lng: -96.7960 },
  { name: "Pressed Juicery - NorthPark", city: "Dallas", state: "TX", lat: 32.8670, lng: -96.7710 },
  { name: "Clean Juice - Uptown", city: "Dallas", state: "TX", lat: 32.8020, lng: -96.8010 },
  { name: "Snap Kitchen - Knox", city: "Dallas", state: "TX", lat: 32.8215, lng: -96.7935 },
  { name: "Snap Kitchen - Uptown", city: "Dallas", state: "TX", lat: 32.8000, lng: -96.8040 },
  { name: "The Porch - Lower Greenville", city: "Dallas", state: "TX", lat: 32.8190, lng: -96.7720 },
  { name: "Sixty Vines - Uptown", city: "Dallas", state: "TX", lat: 32.7990, lng: -96.8020 },
  { name: "Taverna - Knox", city: "Dallas", state: "TX", lat: 32.8225, lng: -96.7945 },
  { name: "Commissary - Bishop Arts", city: "Dallas", state: "TX", lat: 32.7490, lng: -96.8290 },
  { name: "Oddfellows - Bishop Arts", city: "Dallas", state: "TX", lat: 32.7500, lng: -96.8280 },
  { name: "Emporium Pies - Deep Ellum", city: "Dallas", state: "TX", lat: 32.7855, lng: -96.7815 },
  { name: "Oak Cliff Brewing Co", city: "Dallas", state: "TX", lat: 32.7450, lng: -96.8300 },
  { name: "Community Beer Co", city: "Dallas", state: "TX", lat: 32.7920, lng: -96.8250 },
  { name: "Peticolas Brewing", city: "Dallas", state: "TX", lat: 32.7900, lng: -96.8280 },
  { name: "Greenville Avenue Pizza", city: "Dallas", state: "TX", lat: 32.8250, lng: -96.7700 },
  { name: "The Juice Bar - Lakewood", city: "Dallas", state: "TX", lat: 32.8230, lng: -96.7480 },
  { name: "YogaSport - Greenville", city: "Dallas", state: "TX", lat: 32.8270, lng: -96.7680 },
  { name: "CorePower Yoga - Uptown", city: "Dallas", state: "TX", lat: 32.8010, lng: -96.8025 },
  { name: "Equinox - Highland Park", city: "Dallas", state: "TX", lat: 32.8360, lng: -96.7970 },
  { name: "Meso Maya - Trinity Groves", city: "Dallas", state: "TX", lat: 32.7720, lng: -96.8540 },
  { name: "Mot Hai Ba", city: "Dallas", state: "TX", lat: 32.8205, lng: -96.7725 },
  { name: "Crossfit Oak Cliff Juice Bar", city: "Dallas", state: "TX", lat: 32.7440, lng: -96.8310 },
  // FORT WORTH (25)
  { name: "Whole Foods Market - Fort Worth", city: "Fort Worth", state: "TX", lat: 32.7380, lng: -97.3530 },
  { name: "Whole Foods Market - Alliance", city: "Fort Worth", state: "TX", lat: 32.9260, lng: -97.3180 },
  { name: "Central Market - Fort Worth", city: "Fort Worth", state: "TX", lat: 32.7410, lng: -97.3610 },
  { name: "Central Market - Hulen", city: "Fort Worth", state: "TX", lat: 32.6920, lng: -97.3830 },
  { name: "Magnolia Provisions", city: "Fort Worth", state: "TX", lat: 32.7530, lng: -97.3320 },
  { name: "Fixture Kitchen & Social", city: "Fort Worth", state: "TX", lat: 32.7500, lng: -97.3300 },
  { name: "Pressed - Fort Worth", city: "Fort Worth", state: "TX", lat: 32.7520, lng: -97.3340 },
  { name: "Avoca Coffee - Camp Bowie", city: "Fort Worth", state: "TX", lat: 32.7450, lng: -97.3750 },
  { name: "Avoca Coffee - Magnolia", city: "Fort Worth", state: "TX", lat: 32.7540, lng: -97.3330 },
  { name: "Clearfork Farmers Market", city: "Fort Worth", state: "TX", lat: 32.7100, lng: -97.3700 },
  { name: "Cowtown Farmers Market", city: "Fort Worth", state: "TX", lat: 32.7520, lng: -97.3350 },
  { name: "Spiral Diner - Fort Worth", city: "Fort Worth", state: "TX", lat: 32.7550, lng: -97.3310 },
  { name: "Ellerbe Fine Foods", city: "Fort Worth", state: "TX", lat: 32.7560, lng: -97.3290 },
  { name: "Bird Cafe", city: "Fort Worth", state: "TX", lat: 32.7570, lng: -97.3310 },
  { name: "Press Cafe - West 7th", city: "Fort Worth", state: "TX", lat: 32.7590, lng: -97.3450 },
  { name: "Clean Juice - Fort Worth", city: "Fort Worth", state: "TX", lat: 32.7600, lng: -97.3400 },
  { name: "Snap Kitchen - Fort Worth", city: "Fort Worth", state: "TX", lat: 32.7580, lng: -97.3420 },
  { name: "Cane Rosso - Fort Worth", city: "Fort Worth", state: "TX", lat: 32.7510, lng: -97.3280 },
  { name: "Collective Brewing Project", city: "Fort Worth", state: "TX", lat: 32.7610, lng: -97.3380 },
  { name: "HopFusion Ale Works", city: "Fort Worth", state: "TX", lat: 32.7480, lng: -97.3260 },
  { name: "Martin House Brewing", city: "Fort Worth", state: "TX", lat: 32.7470, lng: -97.3250 },
  { name: "Panther Island Brewing", city: "Fort Worth", state: "TX", lat: 32.7620, lng: -97.3330 },
  { name: "Roots Juicery", city: "Fort Worth", state: "TX", lat: 32.7550, lng: -97.3360 },
  { name: "Nonna Tata", city: "Fort Worth", state: "TX", lat: 32.7540, lng: -97.3300 },
  { name: "Tinie's Mexican Food", city: "Fort Worth", state: "TX", lat: 32.7490, lng: -97.3340 },
  // PLANO (18)
  { name: "Whole Foods Market - Plano", city: "Plano", state: "TX", lat: 33.0230, lng: -96.7130 },
  { name: "Central Market - Plano", city: "Plano", state: "TX", lat: 33.0190, lng: -96.7500 },
  { name: "Legacy Food Hall", city: "Plano", state: "TX", lat: 33.0770, lng: -96.8280 },
  { name: "Flower Child - Legacy West", city: "Plano", state: "TX", lat: 33.0760, lng: -96.8290 },
  { name: "Urban Crust", city: "Plano", state: "TX", lat: 33.0200, lng: -96.7100 },
  { name: "Sixty Vines - Plano", city: "Plano", state: "TX", lat: 33.0780, lng: -96.8270 },
  { name: "True Food Kitchen - Plano", city: "Plano", state: "TX", lat: 33.0770, lng: -96.8260 },
  { name: "Pressed Juicery - Legacy", city: "Plano", state: "TX", lat: 33.0765, lng: -96.8285 },
  { name: "Clean Juice - Plano", city: "Plano", state: "TX", lat: 33.0400, lng: -96.7300 },
  { name: "Snap Kitchen - Plano", city: "Plano", state: "TX", lat: 33.0210, lng: -96.7120 },
  { name: "Whiskey Cake - Plano", city: "Plano", state: "TX", lat: 33.0790, lng: -96.8250 },
  { name: "Sprouts Farmers Market - Plano", city: "Plano", state: "TX", lat: 33.0300, lng: -96.7400 },
  { name: "Natural Grocers - Plano", city: "Plano", state: "TX", lat: 33.0350, lng: -96.7450 },
  { name: "Deep Roots Yoga", city: "Plano", state: "TX", lat: 33.0500, lng: -96.7600 },
  { name: "CorePower Yoga - Plano", city: "Plano", state: "TX", lat: 33.0250, lng: -96.7200 },
  { name: "OM Brewing Company", city: "Plano", state: "TX", lat: 33.0180, lng: -96.7080 },
  { name: "Fillmore Pub", city: "Plano", state: "TX", lat: 33.0220, lng: -96.7150 },
  { name: "Erewhon Juicery - Legacy", city: "Plano", state: "TX", lat: 33.0775, lng: -96.8275 },
  // FRISCO (12)
  { name: "Whole Foods Market - Frisco", city: "Frisco", state: "TX", lat: 33.1510, lng: -96.8230 },
  { name: "Sprouts Farmers Market - Frisco", city: "Frisco", state: "TX", lat: 33.1400, lng: -96.8100 },
  { name: "The Hive Market", city: "Frisco", state: "TX", lat: 33.1550, lng: -96.8300 },
  { name: "Pressed Juicery - Frisco", city: "Frisco", state: "TX", lat: 33.1520, lng: -96.8250 },
  { name: "Clean Juice - Frisco", city: "Frisco", state: "TX", lat: 33.1530, lng: -96.8240 },
  { name: "Cane Rosso - Frisco", city: "Frisco", state: "TX", lat: 33.1500, lng: -96.8220 },
  { name: "True Food Kitchen - Frisco", city: "Frisco", state: "TX", lat: 33.1480, lng: -96.8210 },
  { name: "Flower Child - Frisco", city: "Frisco", state: "TX", lat: 33.1490, lng: -96.8260 },
  { name: "Natural Grocers - Frisco", city: "Frisco", state: "TX", lat: 33.1450, lng: -96.8180 },
  { name: "Lazy Dog - Frisco", city: "Frisco", state: "TX", lat: 33.1540, lng: -96.8270 },
  { name: "Tupelo Honey - Frisco", city: "Frisco", state: "TX", lat: 33.1505, lng: -96.8235 },
  { name: "CorePower Yoga - Frisco", city: "Frisco", state: "TX", lat: 33.1460, lng: -96.8190 },
  // RICHARDSON / ARLINGTON / MCKINNEY / DENTON / SOUTHLAKE (38)
  { name: "Whole Foods - Richardson", city: "Richardson", state: "TX", lat: 32.9530, lng: -96.7300 },
  { name: "Good Karma Kitchen", city: "Richardson", state: "TX", lat: 32.9500, lng: -96.7320 },
  { name: "Sprouts - Richardson", city: "Richardson", state: "TX", lat: 32.9480, lng: -96.7350 },
  { name: "Natural Grocers - Richardson", city: "Richardson", state: "TX", lat: 32.9510, lng: -96.7280 },
  { name: "Cafe Brazil - Richardson", city: "Richardson", state: "TX", lat: 32.9490, lng: -96.7310 },
  { name: "Clean Juice - Richardson", city: "Richardson", state: "TX", lat: 32.9520, lng: -96.7290 },
  { name: "Four Bullets Brewery", city: "Richardson", state: "TX", lat: 32.9470, lng: -96.7340 },
  { name: "Yoga Joint - Richardson", city: "Richardson", state: "TX", lat: 32.9540, lng: -96.7260 },
  { name: "Whole Foods - Arlington", city: "Arlington", state: "TX", lat: 32.7360, lng: -97.1080 },
  { name: "Sprouts - Arlington", city: "Arlington", state: "TX", lat: 32.7350, lng: -97.1100 },
  { name: "Natural Grocers - Arlington", city: "Arlington", state: "TX", lat: 32.7380, lng: -97.1050 },
  { name: "Nunu's Mediterranean", city: "Arlington", state: "TX", lat: 32.7370, lng: -97.1070 },
  { name: "Humperdinks - Arlington", city: "Arlington", state: "TX", lat: 32.7340, lng: -97.1120 },
  { name: "Clean Juice - Arlington", city: "Arlington", state: "TX", lat: 32.7390, lng: -97.1040 },
  { name: "Legal Draft Beer Co", city: "Arlington", state: "TX", lat: 32.7330, lng: -97.1060 },
  { name: "Division Brewing", city: "Arlington", state: "TX", lat: 32.7320, lng: -97.1090 },
  { name: "Local Yocal Farm to Market", city: "McKinney", state: "TX", lat: 33.1980, lng: -96.6150 },
  { name: "McKinney Farmers Market", city: "McKinney", state: "TX", lat: 33.1970, lng: -96.6160 },
  { name: "Sprouts - McKinney", city: "McKinney", state: "TX", lat: 33.1960, lng: -96.6180 },
  { name: "Natural Grocers - McKinney", city: "McKinney", state: "TX", lat: 33.1990, lng: -96.6140 },
  { name: "Harvest - McKinney", city: "McKinney", state: "TX", lat: 33.1975, lng: -96.6155 },
  { name: "Rick's Chophouse", city: "McKinney", state: "TX", lat: 33.1985, lng: -96.6145 },
  { name: "Clean Juice - McKinney", city: "McKinney", state: "TX", lat: 33.1950, lng: -96.6190 },
  { name: "TUPPS Brewery", city: "McKinney", state: "TX", lat: 33.1995, lng: -96.6130 },
  { name: "Denton Community Market", city: "Denton", state: "TX", lat: 33.2150, lng: -97.1330 },
  { name: "Natural Grocers - Denton", city: "Denton", state: "TX", lat: 33.2140, lng: -97.1350 },
  { name: "Jupiter House Coffee", city: "Denton", state: "TX", lat: 33.2160, lng: -97.1320 },
  { name: "Juicy Pig BBQ", city: "Denton", state: "TX", lat: 33.2130, lng: -97.1340 },
  { name: "Audacity Brew House", city: "Denton", state: "TX", lat: 33.2170, lng: -97.1310 },
  { name: "Clean Juice - Denton", city: "Denton", state: "TX", lat: 33.2120, lng: -97.1360 },
  { name: "Whole Foods - Southlake", city: "Southlake", state: "TX", lat: 32.9410, lng: -97.1340 },
  { name: "Southlake Town Square Market", city: "Southlake", state: "TX", lat: 32.9420, lng: -97.1330 },
  { name: "Main Street Market", city: "Grapevine", state: "TX", lat: 32.9340, lng: -97.0780 },
  { name: "Grapevine Olive Oil Co", city: "Grapevine", state: "TX", lat: 32.9350, lng: -97.0770 },
  { name: "Sprouts - Colleyville", city: "Colleyville", state: "TX", lat: 32.8810, lng: -97.1500 },
  { name: "Clean Juice - Southlake", city: "Southlake", state: "TX", lat: 32.9430, lng: -97.1320 },
  { name: "Flower Child - Southlake", city: "Southlake", state: "TX", lat: 32.9400, lng: -97.1350 },
  { name: "True Food Kitchen - Southlake", city: "Southlake", state: "TX", lat: 32.9415, lng: -97.1345 },
  // AUSTIN (20)
  { name: "Whole Foods - Lamar", city: "Austin", state: "TX", lat: 30.3100, lng: -97.7520 },
  { name: "Whole Foods - Domain", city: "Austin", state: "TX", lat: 30.4020, lng: -97.7250 },
  { name: "Whole Foods - Gateway", city: "Austin", state: "TX", lat: 30.4440, lng: -97.6930 },
  { name: "Central Market - N. Lamar", city: "Austin", state: "TX", lat: 30.3200, lng: -97.7380 },
  { name: "Central Market - Westgate", city: "Austin", state: "TX", lat: 30.2280, lng: -97.7850 },
  { name: "Sprouts - South Lamar", city: "Austin", state: "TX", lat: 30.2500, lng: -97.7700 },
  { name: "Sprouts - Anderson Mill", city: "Austin", state: "TX", lat: 30.4500, lng: -97.8000 },
  { name: "Natural Grocers - Austin", city: "Austin", state: "TX", lat: 30.3500, lng: -97.7400 },
  { name: "Wheatsville Co-op", city: "Austin", state: "TX", lat: 30.3050, lng: -97.7400 },
  { name: "Juiceland - S. Congress", city: "Austin", state: "TX", lat: 30.2480, lng: -97.7500 },
  { name: "Juiceland - E. 6th", city: "Austin", state: "TX", lat: 30.2650, lng: -97.7300 },
  { name: "True Food Kitchen - Domain", city: "Austin", state: "TX", lat: 30.4010, lng: -97.7260 },
  { name: "Flower Child - Domain", city: "Austin", state: "TX", lat: 30.4015, lng: -97.7255 },
  { name: "Picnik - South Lamar", city: "Austin", state: "TX", lat: 30.2520, lng: -97.7680 },
  { name: "Bouldin Creek Cafe", city: "Austin", state: "TX", lat: 30.2450, lng: -97.7580 },
  { name: "Counter Culture", city: "Austin", state: "TX", lat: 30.2430, lng: -97.7600 },
  { name: "The Vegan Nom", city: "Austin", state: "TX", lat: 30.2600, lng: -97.7200 },
  { name: "Hopsquad Brewing", city: "Austin", state: "TX", lat: 30.2300, lng: -97.7900 },
  { name: "Meanwhile Brewing", city: "Austin", state: "TX", lat: 30.2200, lng: -97.7700 },
  { name: "in.gredients", city: "Austin", state: "TX", lat: 30.2680, lng: -97.7150 },
  // HOUSTON (20)
  { name: "Whole Foods - Kirby", city: "Houston", state: "TX", lat: 29.7330, lng: -95.4210 },
  { name: "Whole Foods - Montrose", city: "Houston", state: "TX", lat: 29.7450, lng: -95.3940 },
  { name: "Whole Foods - Sugar Land", city: "Houston", state: "TX", lat: 29.5970, lng: -95.6220 },
  { name: "Whole Foods - Woodlands", city: "Houston", state: "TX", lat: 30.1600, lng: -95.4600 },
  { name: "Central Market - Westheimer", city: "Houston", state: "TX", lat: 29.7400, lng: -95.4500 },
  { name: "Sprouts - Heights", city: "Houston", state: "TX", lat: 29.7900, lng: -95.3980 },
  { name: "Sprouts - Montrose", city: "Houston", state: "TX", lat: 29.7460, lng: -95.3950 },
  { name: "Natural Grocers - Houston", city: "Houston", state: "TX", lat: 29.7800, lng: -95.4100 },
  { name: "Local Foods - Rice Village", city: "Houston", state: "TX", lat: 29.7160, lng: -95.4150 },
  { name: "Local Foods - Heights", city: "Houston", state: "TX", lat: 29.7910, lng: -95.3970 },
  { name: "Canopy - Montrose", city: "Houston", state: "TX", lat: 29.7440, lng: -95.3960 },
  { name: "Flower Child - Houston", city: "Houston", state: "TX", lat: 29.7500, lng: -95.4300 },
  { name: "True Food Kitchen - Houston", city: "Houston", state: "TX", lat: 29.7480, lng: -95.4350 },
  { name: "Clean Juice - Heights", city: "Houston", state: "TX", lat: 29.7920, lng: -95.3960 },
  { name: "Pressed Juicery - River Oaks", city: "Houston", state: "TX", lat: 29.7420, lng: -95.4250 },
  { name: "Urban Harvest Market", city: "Houston", state: "TX", lat: 29.7350, lng: -95.4100 },
  { name: "Saint Arnold Brewing", city: "Houston", state: "TX", lat: 29.7700, lng: -95.3550 },
  { name: "8th Wonder Brewery", city: "Houston", state: "TX", lat: 29.7520, lng: -95.3480 },
  { name: "Karbach Brewing", city: "Houston", state: "TX", lat: 29.8300, lng: -95.4550 },
  { name: "B&B Butchers - Heights", city: "Houston", state: "TX", lat: 29.7930, lng: -95.3950 },
  // SAN ANTONIO (12)
  { name: "Whole Foods - Quarry", city: "San Antonio", state: "TX", lat: 29.4650, lng: -98.4750 },
  { name: "Whole Foods - Vineyard", city: "San Antonio", state: "TX", lat: 29.5800, lng: -98.5400 },
  { name: "Central Market - Broadway", city: "San Antonio", state: "TX", lat: 29.4700, lng: -98.4700 },
  { name: "Sprouts - San Antonio", city: "San Antonio", state: "TX", lat: 29.4900, lng: -98.5100 },
  { name: "Natural Grocers - SA", city: "San Antonio", state: "TX", lat: 29.5000, lng: -98.5200 },
  { name: "The Cove", city: "San Antonio", state: "TX", lat: 29.4620, lng: -98.4680 },
  { name: "Green Vegetarian", city: "San Antonio", state: "TX", lat: 29.4400, lng: -98.4900 },
  { name: "Pharm Table", city: "San Antonio", state: "TX", lat: 29.4350, lng: -98.4950 },
  { name: "Freetail Brewing", city: "San Antonio", state: "TX", lat: 29.5200, lng: -98.5600 },
  { name: "Ranger Creek Brewing", city: "San Antonio", state: "TX", lat: 29.5100, lng: -98.5500 },
  { name: "Pearl Farmers Market", city: "San Antonio", state: "TX", lat: 29.4430, lng: -98.4810 },
  { name: "Southerleigh", city: "San Antonio", state: "TX", lat: 29.4420, lng: -98.4820 },
  // OTHER TX + OTHER STATES (20)
  { name: "Whole Foods - Waco", city: "Waco", state: "TX", lat: 31.5500, lng: -97.1500 },
  { name: "Magnolia Table", city: "Waco", state: "TX", lat: 31.5480, lng: -97.1300 },
  { name: "H-E-B Plus - Round Rock", city: "Round Rock", state: "TX", lat: 30.5100, lng: -97.6800 },
  { name: "Sprouts - College Station", city: "College Station", state: "TX", lat: 30.6280, lng: -96.3340 },
  { name: "Natural Grocers - Tyler", city: "Tyler", state: "TX", lat: 32.3510, lng: -95.3010 },
  { name: "Whole Foods - OKC", city: "Oklahoma City", state: "OK", lat: 35.4680, lng: -97.5160 },
  { name: "Native Roots Market", city: "Oklahoma City", state: "OK", lat: 35.4700, lng: -97.5200 },
  { name: "Natural Grocers - Edmond", city: "Edmond", state: "OK", lat: 35.6530, lng: -97.4780 },
  { name: "Whole Foods - Tulsa", city: "Tulsa", state: "OK", lat: 36.1200, lng: -95.9380 },
  { name: "Natural Grocers - Tulsa", city: "Tulsa", state: "OK", lat: 36.1150, lng: -95.9400 },
  { name: "Whole Foods - Little Rock", city: "Little Rock", state: "AR", lat: 34.7500, lng: -92.2700 },
  { name: "Ozark Natural Foods", city: "Fayetteville", state: "AR", lat: 36.0630, lng: -94.1570 },
  { name: "Whole Foods - Baton Rouge", city: "Baton Rouge", state: "LA", lat: 30.4080, lng: -91.1400 },
  { name: "Whole Foods - Magazine St", city: "New Orleans", state: "LA", lat: 29.9260, lng: -90.1000 },
  { name: "Rouses Market - Magazine", city: "New Orleans", state: "LA", lat: 29.9240, lng: -90.0980 },
  { name: "Whole Foods - Albuquerque", city: "Albuquerque", state: "NM", lat: 35.1100, lng: -106.6100 },
  { name: "La Montanita Co-op", city: "Albuquerque", state: "NM", lat: 35.0840, lng: -106.6500 },
  { name: "Whole Foods - Santa Fe", city: "Santa Fe", state: "NM", lat: 35.6700, lng: -105.9500 },
  { name: "Sprouts - Las Cruces", city: "Las Cruces", state: "NM", lat: 32.3200, lng: -106.7600 },
  { name: "Crescent City Farmers Market", city: "New Orleans", state: "LA", lat: 29.9500, lng: -90.0700 },
];

export { locations };
export type { Location };

export default function FindUsSection() {
  const [search, setSearch] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered = useMemo(() => {
    if (!search) return locations;
    const q = search.toLowerCase();
    return locations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.state.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div ref={sectionRef} className="bg-white py-24 md:py-32 px-6">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-10">
          <h2 className="font-heading text-5xl md:text-6xl text-charcoal">
            Find Us Near You
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-[60px] bg-sage" />
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {locations.length}+ locations across Texas and the South
          </p>
        </div>

        {/* Search */}
        <div className="relative mx-auto mb-6 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stores or cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-sage/20 bg-cream py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-muted-foreground focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          />
        </div>

        {/* Map + list side by side */}
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[600px]">
          {/* Leaflet Map */}
          <div className="h-[300px] sm:h-[400px] lg:h-auto flex-1 rounded-2xl overflow-hidden border border-sage/10 shadow-sm">
            <LocationMap locations={filtered} />
          </div>

          {/* Scrollable list */}
          <div className="w-full lg:w-[320px] h-[300px] sm:h-[350px] lg:h-auto flex flex-col rounded-2xl border border-sage/10 bg-cream/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-sage/10 bg-white">
              <p className="text-xs font-medium text-muted-foreground">
                {filtered.length} locations
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map((loc, i) => (
                <a
                  key={`${loc.name}-${i}`}
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.name + ", " + loc.city + ", " + loc.state)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 border-b border-sage/5 px-4 py-2.5 transition-colors hover:bg-sage/5"
                >
                  <MapPin className="h-3.5 w-3.5 mt-0.5 text-sage-dark shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-charcoal truncate">
                      {loc.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {loc.city}, {loc.state}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
