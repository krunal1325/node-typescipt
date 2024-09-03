class AppError extends Error {
    public reason?: string;
    public optionalInfo?: any;
  
    constructor(message: string, reason?: string, optionalInfo?: any) {
      super(message);
      this.reason = reason;
      this.optionalInfo = optionalInfo;
  
      // Set the prototype explicitly to ensure instanceof checks work correctly
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }
  
  export default AppError;
  