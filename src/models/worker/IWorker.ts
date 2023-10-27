export interface IWorker {
    // workerId: string; // Add workerId
    workerId:string;
    name: string;
    jobTitle: string;
    contactNumber: number;
    location: string;
    email: string;
    qualifications: {
        education: string;
        experience: string;
        recommendation: string;
    }; 
    status: WorkerStatus;

}

export enum WorkerStatus {
    PENDING = 'pending',
    ACTIVE = 'activate',
    DEACTIVE = 'deactivate',
  }
  