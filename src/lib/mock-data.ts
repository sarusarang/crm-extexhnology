import type { Project, ProjectStats } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "PROJ001",
    clientName: "Tech Innovations Ltd",
    projectName: "E-commerce Platform",
    country: "United States",
    phoneNumber: "+1-555-123-4567",
    email: "contact@techinnovations.com",
    clientLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Leading technology company specializing in innovative solutions",
    clientApproachDate: "2024-01-15",

    natureOfProject: "web",
    workType: "E-commerce",
    workAssignedDate: "2024-01-20",
    assignedDeliveryDate: "2024-03-15",

    domainStatus: "active",
    domainName: "techinnovations.com",
    domainOwner: "client",
    domainPurchasedFrom: "GoDaddy",
    domainPurchaseDate: "2024-01-22",
    domainExpDate: "2025-01-22",

    serverStatus: "active",
    serverType: "VPS",
    serverName: "AWS EC2",
    serverOwner: "extech",
    serverAcquiredDate: "2024-01-25",
    serverExpDate: "2025-01-25",

    scopeDescription: "Full e-commerce platform with payment integration",
    uxuiAssistant: "Sarah Johnson",
    workStartDate: "2024-01-25",
    assignedDeliveryDate2: "2024-03-15",
    deliveredDate: "2024-03-10",

    developmentAssignedBy: "John Smith",
    devWorkStartDate: "2024-02-01",
    devAssignedDeliveryDate: "2024-03-10",
    devDeliveredDate: "2024-03-08",

    workStatus: "Completed and delivered",
    statusUpdatedDate: "2024-03-10",
    workRawDeliveryDate: "2024-03-08",
    hostingPublishingDate: "2024-03-10",
    handedOverDate: "2024-03-12",
    projectReviewDate: "2024-03-15",

    totalDaysSpent: 45,
    savedDays: 5,
    overSpendDays: 0,
    spentManpowerCost: 15000,

    status: "completed",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-15"
  },
  {
    id: "PROJ002",
    clientName: "Green Energy Corp",
    projectName: "Solar Dashboard",
    country: "Canada",
    phoneNumber: "+1-416-555-9876",
    email: "info@greenenergy.ca",
    clientLogo: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Renewable energy solutions provider",
    clientApproachDate: "2024-02-01",

    natureOfProject: "web",
    workType: "Standard Web",
    workAssignedDate: "2024-02-05",
    assignedDeliveryDate: "2024-04-01",

    domainStatus: "expired",
    domainName: "greenenergy.ca",
    domainOwner: "client",
    domainPurchasedFrom: "Namecheap",
    domainPurchaseDate: "2023-02-05",
    domainExpDate: "2024-02-05",

    serverStatus: "active",
    serverType: "Shared Hosting",
    serverName: "Bluehost",
    serverOwner: "client",
    serverAcquiredDate: "2024-02-08",
    serverExpDate: "2025-02-08",

    scopeDescription: "Energy monitoring dashboard with real-time analytics",
    uxuiAssistant: "Mike Davis",
    workStartDate: "2024-02-10",
    assignedDeliveryDate2: "2024-04-01",

    developmentAssignedBy: "Lisa Chen",
    devWorkStartDate: "2024-02-15",
    devAssignedDeliveryDate: "2024-03-25",

    workStatus: "In development - 80% complete",
    statusUpdatedDate: "2024-03-01",

    totalDaysSpent: 30,
    savedDays: 0,
    overSpendDays: 5,
    spentManpowerCost: 12000,

    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-01"
  },
  {
    id: "PROJ003",
    clientName: "HealthCare Solutions",
    projectName: "Patient Management App",
    country: "United Kingdom",
    phoneNumber: "+44-20-7946-0958",
    email: "contact@healthcaresolutions.co.uk",
    clientLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Digital healthcare solutions provider",
    clientApproachDate: "2024-01-10",

    natureOfProject: "mobile",
    workType: "Mobile App",
    workAssignedDate: "2024-01-18",
    assignedDeliveryDate: "2024-05-15",

    domainStatus: "active",
    domainName: "healthcaresolutions.co.uk",
    domainOwner: "extech",
    domainPurchasedFrom: "Cloudflare",
    domainPurchaseDate: "2024-01-20",
    domainExpDate: "2025-01-20",

    serverStatus: "active",
    serverType: "Cloud",
    serverName: "Google Cloud",
    serverOwner: "extech",
    serverAcquiredDate: "2024-01-22",
    serverExpDate: "2025-01-22",

    scopeDescription: "Mobile app for patient management and appointment scheduling",
    uxuiAssistant: "Emma Wilson",
    workStartDate: "2024-01-25",
    assignedDeliveryDate2: "2024-05-15",

    developmentAssignedBy: "David Brown",
    devWorkStartDate: "2024-02-05",
    devAssignedDeliveryDate: "2024-05-01",

    workStatus: "UI/UX design phase - 60% complete",
    statusUpdatedDate: "2024-02-28",

    totalDaysSpent: 35,
    savedDays: 10,
    overSpendDays: 0,
    spentManpowerCost: 18000,

    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28"
  },
  {
    id: "PROJ003",
    clientName: "HealthCare Solutions",
    projectName: "Patient Management App",
    country: "United Kingdom",
    phoneNumber: "+44-20-7946-0958",
    email: "contact@healthcaresolutions.co.uk",
    clientLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Digital healthcare solutions provider",
    clientApproachDate: "2024-01-10",

    natureOfProject: "mobile",
    workType: "Mobile App",
    workAssignedDate: "2024-01-18",
    assignedDeliveryDate: "2024-05-15",

    domainStatus: "active",
    domainName: "healthcaresolutions.co.uk",
    domainOwner: "extech",
    domainPurchasedFrom: "Cloudflare",
    domainPurchaseDate: "2024-01-20",
    domainExpDate: "2025-01-20",

    serverStatus: "active",
    serverType: "Cloud",
    serverName: "Google Cloud",
    serverOwner: "extech",
    serverAcquiredDate: "2024-01-22",
    serverExpDate: "2025-01-22",

    scopeDescription: "Mobile app for patient management and appointment scheduling",
    uxuiAssistant: "Emma Wilson",
    workStartDate: "2024-01-25",
    assignedDeliveryDate2: "2024-05-15",

    developmentAssignedBy: "David Brown",
    devWorkStartDate: "2024-02-05",
    devAssignedDeliveryDate: "2024-05-01",

    workStatus: "UI/UX design phase - 60% complete",
    statusUpdatedDate: "2024-02-28",

    totalDaysSpent: 35,
    savedDays: 10,
    overSpendDays: 0,
    spentManpowerCost: 18000,

    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28"
  },
  {
    id: "PROJ003",
    clientName: "HealthCare Solutions",
    projectName: "Patient Management App",
    country: "United Kingdom",
    phoneNumber: "+44-20-7946-0958",
    email: "contact@healthcaresolutions.co.uk",
    clientLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Digital healthcare solutions provider",
    clientApproachDate: "2024-01-10",

    natureOfProject: "mobile",
    workType: "Mobile App",
    workAssignedDate: "2024-01-18",
    assignedDeliveryDate: "2024-05-15",

    domainStatus: "active",
    domainName: "healthcaresolutions.co.uk",
    domainOwner: "extech",
    domainPurchasedFrom: "Cloudflare",
    domainPurchaseDate: "2024-01-20",
    domainExpDate: "2025-01-20",

    serverStatus: "active",
    serverType: "Cloud",
    serverName: "Google Cloud",
    serverOwner: "extech",
    serverAcquiredDate: "2024-01-22",
    serverExpDate: "2025-01-22",

    scopeDescription: "Mobile app for patient management and appointment scheduling",
    uxuiAssistant: "Emma Wilson",
    workStartDate: "2024-01-25",
    assignedDeliveryDate2: "2024-05-15",

    developmentAssignedBy: "David Brown",
    devWorkStartDate: "2024-02-05",
    devAssignedDeliveryDate: "2024-05-01",

    workStatus: "UI/UX design phase - 60% complete",
    statusUpdatedDate: "2024-02-28",

    totalDaysSpent: 35,
    savedDays: 10,
    overSpendDays: 0,
    spentManpowerCost: 18000,

    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28"
  },
  {
    id: "PROJ003",
    clientName: "HealthCare Solutions",
    projectName: "Patient Management App",
    country: "United Kingdom",
    phoneNumber: "+44-20-7946-0958",
    email: "contact@healthcaresolutions.co.uk",
    clientLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Digital healthcare solutions provider",
    clientApproachDate: "2024-01-10",

    natureOfProject: "mobile",
    workType: "Mobile App",
    workAssignedDate: "2024-01-18",
    assignedDeliveryDate: "2024-05-15",

    domainStatus: "active",
    domainName: "healthcaresolutions.co.uk",
    domainOwner: "extech",
    domainPurchasedFrom: "Cloudflare",
    domainPurchaseDate: "2024-01-20",
    domainExpDate: "2025-01-20",

    serverStatus: "active",
    serverType: "Cloud",
    serverName: "Google Cloud",
    serverOwner: "extech",
    serverAcquiredDate: "2024-01-22",
    serverExpDate: "2025-01-22",

    scopeDescription: "Mobile app for patient management and appointment scheduling",
    uxuiAssistant: "Emma Wilson",
    workStartDate: "2024-01-25",
    assignedDeliveryDate2: "2024-05-15",

    developmentAssignedBy: "David Brown",
    devWorkStartDate: "2024-02-05",
    devAssignedDeliveryDate: "2024-05-01",

    workStatus: "UI/UX design phase - 60% complete",
    statusUpdatedDate: "2024-02-28",

    totalDaysSpent: 35,
    savedDays: 10,
    overSpendDays: 0,
    spentManpowerCost: 18000,

    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28"
  },
  {
    id: "PROJ003",
    clientName: "HealthCare Solutions",
    projectName: "Patient Management App",
    country: "United Kingdom",
    phoneNumber: "+44-20-7946-0958",
    email: "contact@healthcaresolutions.co.uk",
    clientLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Digital healthcare solutions provider",
    clientApproachDate: "2024-01-10",

    natureOfProject: "mobile",
    workType: "Mobile App",
    workAssignedDate: "2024-01-18",
    assignedDeliveryDate: "2024-05-15",

    domainStatus: "active",
    domainName: "healthcaresolutions.co.uk",
    domainOwner: "extech",
    domainPurchasedFrom: "Cloudflare",
    domainPurchaseDate: "2024-01-20",
    domainExpDate: "2025-01-20",

    serverStatus: "active",
    serverType: "Cloud",
    serverName: "Google Cloud",
    serverOwner: "extech",
    serverAcquiredDate: "2024-01-22",
    serverExpDate: "2025-01-22",

    scopeDescription: "Mobile app for patient management and appointment scheduling",
    uxuiAssistant: "Emma Wilson",
    workStartDate: "2024-01-25",
    assignedDeliveryDate2: "2024-05-15",

    developmentAssignedBy: "David Brown",
    devWorkStartDate: "2024-02-05",
    devAssignedDeliveryDate: "2024-05-01",

    workStatus: "UI/UX design phase - 60% complete",
    statusUpdatedDate: "2024-02-28",

    totalDaysSpent: 35,
    savedDays: 10,
    overSpendDays: 0,
    spentManpowerCost: 18000,

    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28"
  },
  {
    id: "PROJ003",
    clientName: "HealthCare Solutions",
    projectName: "Patient Management App",
    country: "United Kingdom",
    phoneNumber: "+44-20-7946-0958",
    email: "contact@healthcaresolutions.co.uk",
    clientLogo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center",
    aboutClient: "Digital healthcare solutions provider",
    clientApproachDate: "2024-01-10",

    natureOfProject: "mobile",
    workType: "Mobile App",
    workAssignedDate: "2024-01-18",
    assignedDeliveryDate: "2024-05-15",

    domainStatus: "active",
    domainName: "healthcaresolutions.co.uk",
    domainOwner: "extech",
    domainPurchasedFrom: "Cloudflare",
    domainPurchaseDate: "2024-01-20",
    domainExpDate: "2025-01-20",

    serverStatus: "active",
    serverType: "Cloud",
    serverName: "Google Cloud",
    serverOwner: "extech",
    serverAcquiredDate: "2024-01-22",
    serverExpDate: "2025-01-22",

    scopeDescription: "Mobile app for patient management and appointment scheduling",
    uxuiAssistant: "Emma Wilson",
    workStartDate: "2024-01-25",
    assignedDeliveryDate2: "2024-05-15",

    developmentAssignedBy: "David Brown",
    devWorkStartDate: "2024-02-05",
    devAssignedDeliveryDate: "2024-05-01",

    workStatus: "UI/UX design phase - 60% complete",
    statusUpdatedDate: "2024-02-28",

    totalDaysSpent: 35,
    savedDays: 10,
    overSpendDays: 0,
    spentManpowerCost: 18000,

    status: "active",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-28"
  }
];

export const mockStats: ProjectStats = {
  totalProjects: 3,
  pendingProjects: 2,
  completedProjects: 1,
  expiredDomains: 1,
  expiredServers: 0,
  onHoldProjects: 0
};




// // Mock data for payment gateways
export const globalGateways = [
  "PayPal", "Stripe", "Square", "Braintree", "Authorize.Net", "Amazon Pay",
  "Skrill", "2Checkout", "Wise", "Payoneer", "Worldpay", "Adyen",
  "Checkout.com", "Sage Pay", "FIS Global", "GoCardless",
  "Alipay", "WeChat Pay", "UnionPay", "M-Pesa", "bKash", "Nagad", "Easypaisa"
];



// Mock data for Indian payment gateways
export const indianGateways = [
  "Razorpay", "Paytm", "CCAvenue", "Instamojo", "Zaakpay", "PayU", "PayUbiz",
  "Cashfree", "EBS", "DirecPay", "Easebuzz", "BillDesk", "PayMate",
  "BHIM", "PhonePe", "PayZapp"
];
