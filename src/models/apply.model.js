class Apply {
  constructor(fullName, phoneNumber, email, path, jobId) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.path = path;
    this.jobId = Number(jobId);
  }
}

module.exports = Apply;
