/**
 * ARPON — MALAYSIA 2027
 * Initial Dataset & Pipeline Structure
 * Arpon Chakraborty (@arpon.official01)
 * INTI Computer Science AUP/ADTP — January 2027 Intake
 */

export const INTAKE_CONFIG = {
  studentName: "Arpon Chakraborty",
  username: "arpon.official01",
  program: "Computer Science AUP/ADTP",
  institution: "INTI International University & Colleges (Malaysia)",
  intake: "January 2027",
  intakeDate: "2027-01-04T09:00:00+08:00",
  applicationDeadlineTarget: "2026-09-07T23:59:59+06:00", // Target: First week of September 2026
};

export const INITIAL_SECTIONS = [
  {
    id: "documents",
    pageNumber: 1,
    title: "Documents",
    subtitle: "Passport, academic transcripts, certified copies & cloud backup",
    icon: "file-text",
    tasks: [
      { id: "doc-1", title: "Receive passport", completed: false, priority: "high" },
      { id: "doc-2", title: "Check passport name/DOB/details", completed: false, priority: "high" },
      { id: "doc-3", title: "Scan passport", completed: false, priority: "medium" },
      { id: "doc-4", title: "Receive original SSC certificate", completed: false, priority: "high" },
      { id: "doc-5", title: "Receive original SSC marksheet/transcript", completed: false, priority: "high" },
      { id: "doc-6", title: "Check name/DOB/grades on SSC documents", completed: false, priority: "high" },
      { id: "doc-7", title: "Make 2 photocopies of SSC certificate", completed: false, priority: "medium" },
      { id: "doc-8", title: "Make 2 photocopies of SSC marksheet", completed: false, priority: "medium" },
      { id: "doc-9", title: "Get required academic copies certified true", completed: false, priority: "high" },
      { id: "doc-10", title: "Take passport photos — 3.5 × 4.5 cm, white background", completed: false, priority: "medium" },
      { id: "doc-11", title: "Prepare digital document folder", completed: false, priority: "medium" },
      { id: "doc-12", title: "Backup documents to cloud", completed: false, priority: "high" }
    ]
  },
  {
    id: "inti",
    pageNumber: 2,
    title: "INTI Application",
    displayTitle: "INTI Computer Science AUP/ADTP — January 2027",
    subtitle: "Program confirmation, forms, offer letter acceptance & fee payments",
    icon: "graduation-cap",
    tasks: [
      { id: "inti-1", title: "Confirm exact Computer Science AUP/ADTP", completed: false, priority: "high" },
      { id: "inti-2", title: "Confirm campus", completed: false, priority: "high" },
      { id: "inti-3", title: "Confirm January 2027 intake", completed: false, priority: "high" },
      { id: "inti-4", title: "Confirm fees", completed: false, priority: "high" },
      { id: "inti-5", title: "Complete INTI International Student Application Form", completed: false, priority: "high" },
      { id: "inti-6", title: "Complete accommodation form if needed", completed: false, priority: "medium" },
      { id: "inti-7", title: "Upload/submit documents", completed: false, priority: "high" },
      { id: "inti-8", title: "Pay application fee", completed: false, priority: "high" },
      { id: "inti-9", title: "Submit application — target: first week of September 2026", completed: false, priority: "high", note: "Crucial milestone: Submit before Sept 7, 2026" },
      { id: "inti-10", title: "Save application confirmation", completed: false, priority: "medium" },
      { id: "inti-11", title: "Monitor email", completed: false, priority: "medium" },
      { id: "inti-12", title: "Respond to INTI if additional documents are requested", completed: false, priority: "high" },
      { id: "inti-13", title: "Receive Offer Letter", completed: false, priority: "high" },
      { id: "inti-14", title: "Check Offer Letter name/passport/program/intake", completed: false, priority: "high" },
      { id: "inti-15", title: "Accept Offer Letter", completed: false, priority: "high" },
      { id: "inti-16", title: "Pay required initial fees", completed: false, priority: "high" }
    ]
  },
  {
    id: "visa",
    pageNumber: 3,
    title: "Visa / EMGS",
    subtitle: "Student pass processing, health declaration, eVAL approval & flight booking",
    icon: "shield-check",
    tasks: [
      { id: "visa-1", title: "INTI/EMGS student-pass application started", completed: false, priority: "high" },
      { id: "visa-2", title: "Complete Health Declaration", completed: false, priority: "high" },
      { id: "visa-3", title: "Submit passport documents", completed: false, priority: "high" },
      { id: "visa-4", title: "Submit Offer Letter", completed: false, priority: "high" },
      { id: "visa-5", title: "Submit academic documents", completed: false, priority: "high" },
      { id: "visa-6", title: "Submit English certificate if required", completed: false, priority: "medium" },
      { id: "visa-7", title: "Complete/pay required EMGS/visa/insurance/medical fees", completed: false, priority: "high" },
      { id: "visa-8", title: "Track EMGS application", completed: false, priority: "medium" },
      { id: "visa-9", title: "Receive eVAL", completed: false, priority: "high" },
      { id: "visa-10", title: "Check whether Bangladesh requires SEV for my case", completed: false, priority: "high" },
      { id: "visa-11", title: "Apply for SEV/eVisa if required", completed: false, priority: "high" },
      { id: "visa-12", title: "Receive/confirm visa approval", completed: false, priority: "high" },
      { id: "visa-13", title: "Book flight", completed: false, priority: "high" }
    ]
  },
  {
    id: "accommodation",
    pageNumber: 4,
    title: "Accommodation",
    subtitle: "Housing options, room confirmation, deposit & facility checks",
    icon: "home",
    tasks: [
      { id: "acc-1", title: "Choose INTI accommodation/off-campus option", completed: false, priority: "high" },
      { id: "acc-2", title: "Confirm room", completed: false, priority: "high" },
      { id: "acc-3", title: "Pay booking/deposit if required", completed: false, priority: "high" },
      { id: "acc-4", title: "Save accommodation confirmation", completed: false, priority: "medium" },
      { id: "acc-5", title: "Get exact address", completed: false, priority: "high" },
      { id: "acc-6", title: "Check furniture included", completed: false, priority: "medium" },
      { id: "acc-7", title: "Check bedding", completed: false, priority: "medium" },
      { id: "acc-8", title: "Check laundry", completed: false, priority: "medium" },
      { id: "acc-9", title: "Check Wi-Fi", completed: false, priority: "high" },
      { id: "acc-10", title: "Check kitchen facilities", completed: false, priority: "medium" }
    ]
  },
  {
    id: "finance",
    pageNumber: 5,
    title: "Finance",
    subtitle: "Budget calculations, tuition funds, payment setups & Ringgit readiness",
    icon: "dollar-sign",
    tasks: [
      { id: "fin-1", title: "Calculate first-year total budget", completed: false, priority: "high" },
      { id: "fin-2", title: "Tuition money ready", completed: false, priority: "high" },
      { id: "fin-3", title: "Visa/EMGS money ready", completed: false, priority: "high" },
      { id: "fin-4", title: "Accommodation money ready", completed: false, priority: "high" },
      { id: "fin-5", title: "Flight money ready", completed: false, priority: "high" },
      { id: "fin-6", title: "Emergency fund ready", completed: false, priority: "high" },
      { id: "fin-7", title: "Set up suitable international payment method", completed: false, priority: "high" },
      { id: "fin-8", title: "Carry Malaysian Ringgit for arrival", completed: false, priority: "high" }
    ]
  },
  {
    id: "shopping",
    pageNumber: 6,
    title: "Shopping",
    subtitle: "Categorized packing checklist: Travel, Study, Tech, Clothing & Gear",
    icon: "shopping-bag",
    isCategorized: true,
    categories: [
      {
        id: "travel",
        title: "TRAVEL",
        icon: "briefcase",
        tasks: [
          { id: "shop-tr-1", title: "Large suitcase", completed: false, priority: "high" },
          { id: "shop-tr-2", title: "Cabin suitcase/bag", completed: false, priority: "high" },
          { id: "shop-tr-3", title: "Backpack", completed: false, priority: "high" },
          { id: "shop-tr-4", title: "Luggage locks", completed: false, priority: "medium" },
          { id: "shop-tr-5", title: "Luggage tags", completed: false, priority: "low" },
          { id: "shop-tr-6", title: "Luggage scale", completed: false, priority: "medium" },
          { id: "shop-tr-7", title: "Travel pouch/document organizer", completed: false, priority: "high" }
        ]
      },
      {
        id: "study",
        title: "STUDY",
        icon: "book-open",
        tasks: [
          { id: "shop-st-1", title: "Laptop", completed: false, priority: "high" },
          { id: "shop-st-2", title: "Laptop charger", completed: false, priority: "high" },
          { id: "shop-st-3", title: "Laptop bag", completed: false, priority: "medium" },
          { id: "shop-st-4", title: "Mouse", completed: false, priority: "medium" },
          { id: "shop-st-5", title: "Headphones/earbuds", completed: false, priority: "high" },
          { id: "shop-st-6", title: "USB/SSD", completed: false, priority: "high" },
          { id: "shop-st-7", title: "Notebook", completed: false, priority: "low" },
          { id: "shop-st-8", title: "Pens", completed: false, priority: "low" }
        ]
      },
      {
        id: "electronics",
        title: "ELECTRONICS",
        icon: "cpu",
        tasks: [
          { id: "shop-el-1", title: "Universal adapter", completed: false, priority: "high" },
          { id: "shop-el-2", title: "Extension/power strip", completed: false, priority: "high" },
          { id: "shop-el-3", title: "Phone charger", completed: false, priority: "high" },
          { id: "shop-el-4", title: "Spare charging cable", completed: false, priority: "medium" },
          { id: "shop-el-5", title: "Power bank", completed: false, priority: "high" },
          { id: "shop-el-6", title: "Phone tripod", completed: false, priority: "medium" }
        ]
      },
      {
        id: "clothes",
        title: "CLOTHES",
        icon: "tag",
        tasks: [
          { id: "shop-cl-1", title: "T-shirts", completed: false, priority: "medium" },
          { id: "shop-cl-2", title: "Shirts", completed: false, priority: "medium" },
          { id: "shop-cl-3", title: "Jeans/trousers", completed: false, priority: "medium" },
          { id: "shop-cl-4", title: "Shorts", completed: false, priority: "low" },
          { id: "shop-cl-5", title: "Joggers", completed: false, priority: "medium" },
          { id: "shop-cl-6", title: "Underwear", completed: false, priority: "high" },
          { id: "shop-cl-7", title: "Socks", completed: false, priority: "medium" },
          { id: "shop-cl-8", title: "Sleepwear", completed: false, priority: "medium" },
          { id: "shop-cl-9", title: "Hoodie/light jacket", completed: false, priority: "medium" },
          { id: "shop-cl-10", title: "Formal outfit", completed: false, priority: "high" },
          { id: "shop-cl-11", title: "Sneakers", completed: false, priority: "high" },
          { id: "shop-cl-12", title: "Slides", completed: false, priority: "medium" },
          { id: "shop-cl-13", title: "Gym clothes", completed: false, priority: "low" }
        ]
      },
      {
        id: "personal",
        title: "PERSONAL",
        icon: "heart",
        tasks: [
          { id: "shop-pe-1", title: "Toothbrush", completed: false, priority: "high" },
          { id: "shop-pe-2", title: "Toothpaste", completed: false, priority: "high" },
          { id: "shop-pe-3", title: "Shampoo", completed: false, priority: "medium" },
          { id: "shop-pe-4", title: "Body wash", completed: false, priority: "medium" },
          { id: "shop-pe-5", title: "Face wash", completed: false, priority: "medium" },
          { id: "shop-pe-6", title: "Deodorant", completed: false, priority: "medium" },
          { id: "shop-pe-7", title: "Razor", completed: false, priority: "medium" },
          { id: "shop-pe-8", title: "Comb", completed: false, priority: "low" },
          { id: "shop-pe-9", title: "Nail cutter", completed: false, priority: "medium" },
          { id: "shop-pe-10", title: "Towels", completed: false, priority: "high" },
          { id: "shop-pe-11", title: "Laundry bag", completed: false, priority: "medium" }
        ]
      },
      {
        id: "creator",
        title: "CREATOR",
        icon: "video",
        tasks: [
          { id: "shop-cr-1", title: "Tripod", completed: false, priority: "medium" },
          { id: "shop-cr-2", title: "Microphone", completed: false, priority: "medium" },
          { id: "shop-cr-3", title: "Small LED light", completed: false, priority: "medium" },
          { id: "shop-cr-4", title: "Phone mount", completed: false, priority: "medium" },
          { id: "shop-cr-5", title: "Storage/backup", completed: false, priority: "high" }
        ]
      },
      {
        id: "room",
        title: "ROOM — ONLY IF NOT PROVIDED",
        icon: "moon",
        tasks: [
          { id: "shop-rm-1", title: "Bedsheets", completed: false, priority: "medium" },
          { id: "shop-rm-2", title: "Pillow", completed: false, priority: "medium" },
          { id: "shop-rm-3", title: "Blanket", completed: false, priority: "medium" },
          { id: "shop-rm-4", title: "Hangers", completed: false, priority: "low" },
          { id: "shop-rm-5", title: "Storage boxes", completed: false, priority: "low" }
        ]
      }
    ]
  },
  {
    id: "departure",
    pageNumber: 7,
    title: "Final Departure",
    subtitle: "Flight confirmation, MDAC arrival card, printouts & cabin bag essentials",
    icon: "plane",
    tasks: [
      { id: "dep-1", title: "Confirm flight", completed: false, priority: "high" },
      { id: "dep-2", title: "Complete MDAC within required period", completed: false, priority: "high", note: "Submit Malaysia Digital Arrival Card (MDAC) 3 days prior" },
      { id: "dep-3", title: "Submit INTI arrival form", completed: false, priority: "high" },
      { id: "dep-4", title: "Send flight details to INTI", completed: false, priority: "high" },
      { id: "dep-5", title: "Print Offer Letter", completed: false, priority: "high" },
      { id: "dep-6", title: "Print eVAL", completed: false, priority: "high" },
      { id: "dep-7", title: "Print SEV/eVisa if applicable", completed: false, priority: "high" },
      { id: "dep-8", title: "Passport in cabin bag", completed: false, priority: "high" },
      { id: "dep-9", title: "Original SSC documents in cabin bag", completed: false, priority: "high" },
      { id: "dep-10", title: "Accommodation confirmation", completed: false, priority: "high" },
      { id: "dep-11", title: "INTI contact details", completed: false, priority: "medium" },
      { id: "dep-12", title: "Emergency contacts", completed: false, priority: "high" },
      { id: "dep-13", title: "Phone/internet ready", completed: false, priority: "high" }
    ]
  },
  {
    id: "arrival",
    pageNumber: 8,
    title: "After Arrival",
    subtitle: "Post-arrival medical screening, Student Pass endorsement, registration & orientation",
    icon: "compass",
    tasks: [
      { id: "arr-1", title: "Coordinate with INTI", completed: false, priority: "high" },
      { id: "arr-2", title: "Go to accommodation", completed: false, priority: "high" },
      { id: "arr-3", title: "Complete post-arrival medical screening", completed: false, priority: "high" },
      { id: "arr-4", title: "Submit passport for Student Pass endorsement as instructed", completed: false, priority: "high" },
      { id: "arr-5", title: "Complete INTI registration", completed: false, priority: "high" },
      { id: "arr-6", title: "Collect student ID", completed: false, priority: "high" },
      { id: "arr-7", title: "Attend orientation", completed: false, priority: "medium" },
      { id: "arr-8", title: "Start classes", completed: false, priority: "high" }
    ]
  }
];

export const PREPARATION_STAGES = [
  { id: "stage-1", name: "Stage 1: Documentation & Records", threshold: 12, max: 20 },
  { id: "stage-2", name: "Stage 2: INTI Application & Offer", threshold: 28, max: 40 },
  { id: "stage-3", name: "Stage 3: Visa & EMGS Approval", threshold: 41, max: 60 },
  { id: "stage-4", name: "Stage 4: Logistics, Shopping & Departure", threshold: 120, max: 90 },
  { id: "stage-5", name: "Stage 5: Arrival & Campus Life", threshold: 135, max: 100 }
];
