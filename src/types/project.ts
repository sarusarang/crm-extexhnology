





// Worker Interface
export interface Worker {
    unique_id: string;
    worker_name: string;
    work_role: string;
    work_status: string;
    work_started_date: string; // ISO Date string
    worker_end_date: string;   // ISO Date string
    assigned_end_date: string; // ISO Date string
    created_at: string;        // ISO Date string
    updated_at: string;        // ISO Date string
    client_project: string;
}




// Project Interface
export interface Project {

    unique_id: string;
    workers: Worker[];


    // Client Details
    client_name: string;
    country: string;
    phone_number: string;
    email: string;
    company_sector: string;
    about: string | null;
    client_logo: string | null;
    client_approach_date: string; // Date string


    // Project Details
    project_name: string;
    project_type: string;
    work_type: string;
    scope_of_work: string;
    work_assigned_date: string;
    work_assigned_delivery_date: string;
    work_completed_date: string;
    project_status: string;


    // Domain Details
    domain_name: string;
    domain_provider: string;
    domain_owned_by: string;
    domain_purchased_date: string;
    domain_expiry_date: string;
    domain_status: string;


    // Server Details
    server_status: string;
    server_type: string;
    server_name: string;
    server_owned_by: string;
    server_accrued_date: string;
    server_expiry_date: string;


    // Payment Details
    gateway_used: string;
    payment_gateway: string;
    payment_gateway_url: string;
    payment_gateway_username: string;
    payment_gateway_password: string;


    created_at: string;
    updated_at: string;

}



// Links Interface
export interface Links {
    next: string | null;
    previous: string | null;
}



// Paginated Response Interface
export interface PaginatedProjectsResponse {
    links: Links;
    count: number;
    total_pages: number;
    current_page: number;
    page_size: number;
    results: Project[];
}




export interface ProjectStats {
    totalProjects: number;
    pendingProjects: number;
    completedProjects: number;
    expiredDomains: number;
    expiredServers: number;
    onHoldProjects: number;
}




// Login Response Types
export type UserType = "superadmin" | "admin" | "developer" ;

export interface AuthTokensResponse {
    refresh: string;
    access: string;
    name: string;
    user_type: UserType;
}