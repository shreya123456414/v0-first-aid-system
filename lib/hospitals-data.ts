import type { Hospital } from "./first-aid-types"

export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Bhopal",
  "Chandigarh",
  "Patna",
  "Guwahati",
  "Thiruvananthapuram",
]

export const HOSPITALS: Record<string, Hospital[]> = {
  Mumbai: [
    {
      name: "Lilavati Hospital",
      address: "A-791, Bandra Reclamation, Bandra West",
      phone: "022-2675 1000",
    },
    {
      name: "Kokilaben Dhirubhai Ambani Hospital",
      address: "Rao Saheb Achutrao Patwardhan Marg, Four Bunglows",
      phone: "022-3066 6666",
    },
    {
      name: "Hinduja Hospital",
      address: "Veer Savarkar Marg, Mahim",
      phone: "022-2444 9199",
    },
  ],
  Delhi: [
    {
      name: "AIIMS Delhi",
      address: "Sri Aurobindo Marg, Ansari Nagar",
      phone: "011-2658 8500",
    },
    {
      name: "Safdarjung Hospital",
      address: "Ansari Nagar West, Ring Road",
      phone: "011-2616 5060",
    },
    {
      name: "Max Super Speciality Hospital",
      address: "1, 2, Press Enclave Road, Saket",
      phone: "011-2651 5050",
    },
  ],
  Bangalore: [
    {
      name: "Manipal Hospital",
      address: "98, HAL Old Airport Road",
      phone: "080-2502 4444",
    },
    {
      name: "Narayana Health City",
      address: "258/A, Bommasandra Industrial Area",
      phone: "080-7122 2222",
    },
    {
      name: "St. John's Medical College Hospital",
      address: "Sarjapur Road, Koramangala",
      phone: "080-2206 5000",
    },
  ],
  Hyderabad: [
    {
      name: "Apollo Hospital",
      address: "Film Nagar, Jubilee Hills",
      phone: "040-2360 7777",
    },
    {
      name: "NIMS Hospital",
      address: "Punjagutta",
      phone: "040-2348 9000",
    },
    {
      name: "Yashoda Hospital",
      address: "Raj Bhavan Road, Somajiguda",
      phone: "040-4567 8901",
    },
  ],
  Chennai: [
    {
      name: "Apollo Hospital",
      address: "21, Greams Lane, Off Greams Road",
      phone: "044-2829 3333",
    },
    {
      name: "MIOT International",
      address: "4/112, Mount Poonamallee Road",
      phone: "044-4200 0000",
    },
    {
      name: "Government General Hospital",
      address: "Park Town, George Town",
      phone: "044-2530 5000",
    },
  ],
  Kolkata: [
    {
      name: "SSKM Hospital",
      address: "244, AJC Bose Road",
      phone: "033-2223 5611",
    },
    {
      name: "Fortis Hospital",
      address: "730, EM Bypass Road, Anandapur",
      phone: "033-6628 4444",
    },
    {
      name: "RN Tagore International Hospital",
      address: "Rawdon Street, Muktaram Babu Street",
      phone: "033-4040 1040",
    },
  ],
  Pune: [
    {
      name: "Sahyadri Hospital",
      address: "30-C, Erandwane, Karve Road",
      phone: "020-6721 3000",
    },
    {
      name: "Ruby Hall Clinic",
      address: "40, Sasoon Road, Sangamvadi",
      phone: "020-6645 5183",
    },
    {
      name: "Jehangir Hospital",
      address: "32, Sasoon Road, Pune",
      phone: "020-6608 1600",
    },
  ],
  Ahmedabad: [
    {
      name: "Civil Hospital",
      address: "Asarwa, Ahmedabad",
      phone: "079-2268 3721",
    },
    {
      name: "Sterling Hospital",
      address: "Gurukul Road, Memnagar",
      phone: "079-4002 3000",
    },
    {
      name: "Shalby Hospital",
      address: "Opp. Karnavati Club, S.G. Highway",
      phone: "079-4020 3000",
    },
  ],
  Jaipur: [
    {
      name: "SMS Hospital",
      address: "JLN Marg, Jaipur",
      phone: "0141-256 0291",
    },
    {
      name: "Fortis Escorts Hospital",
      address: "JLN Marg, Malviya Nagar",
      phone: "0141-254 7000",
    },
    {
      name: "Mahatma Gandhi Hospital",
      address: "RIICO Industrial Area, Sitapura",
      phone: "0141-277 1001",
    },
  ],
  Lucknow: [
    {
      name: "KGMU Hospital",
      address: "Shah Mina Road, Chowk",
      phone: "0522-225 7540",
    },
    {
      name: "Medanta Hospital",
      address: "Shaheed Path, Gomti Nagar Extension",
      phone: "0522-678 9000",
    },
    {
      name: "Sahara Hospital",
      address: "Viraj Khand, Gomti Nagar",
      phone: "0522-674 0000",
    },
  ],
  Bhopal: [
    {
      name: "AIIMS Bhopal",
      address: "Saket Nagar, Bhopal",
      phone: "0755-298 4646",
    },
    {
      name: "Hamidia Hospital",
      address: "Royal Market, Bhopal",
      phone: "0755-274 0634",
    },
    {
      name: "Bansal Hospital",
      address: "C-Sector, Shahpura, Bhopal",
      phone: "0755-401 0000",
    },
  ],
  Chandigarh: [
    {
      name: "PGIMER",
      address: "Sector 12, Chandigarh",
      phone: "0172-274 6018",
    },
    {
      name: "GMCH Sector 32",
      address: "Sector 32, Chandigarh",
      phone: "0172-266 5253",
    },
    {
      name: "Fortis Hospital",
      address: "Sector 62, Phase 8, Mohali",
      phone: "0172-509 2444",
    },
  ],
  Patna: [
    {
      name: "PMCH Hospital",
      address: "Ashok Rajpath, Patna",
      phone: "0612-230 0343",
    },
    {
      name: "IGIMS Hospital",
      address: "Raja Bazar, Patna",
      phone: "0612-229 7631",
    },
    {
      name: "Paras HMRI Hospital",
      address: "NH-30, Bailey Road, Patna",
      phone: "0612-710 7700",
    },
  ],
  Guwahati: [
    {
      name: "GMCH Guwahati",
      address: "Bhangagarh, Guwahati",
      phone: "0361-252 9457",
    },
    {
      name: "Nemcare Hospital",
      address: "GS Road, Bhangagarh",
      phone: "0361-234 1000",
    },
    {
      name: "Down Town Hospital",
      address: "GS Road, Dispur",
      phone: "0361-233 1000",
    },
  ],
  Thiruvananthapuram: [
    {
      name: "Medical College Hospital",
      address: "Chalakkuzhi, Thiruvananthapuram",
      phone: "0471-252 8386",
    },
    {
      name: "KIMS Hospital",
      address: "Anayara PO, Thiruvananthapuram",
      phone: "0471-294 1400",
    },
    {
      name: "SUT Hospital",
      address: "Pattom, Thiruvananthapuram",
      phone: "0471-235 7000",
    },
  ],
}
