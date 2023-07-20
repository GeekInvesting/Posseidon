export class GetInvestor {
  investor: any;

  constructor() {
    this.investor = JSON.parse(localStorage.getItem("investor") || "{}");
    console.log(this.investor);
  }

  isInvestor(): boolean {
    return this.investor || this.investor.investorName !== "";
  }

  investorName(): string {
    return this.investor.investorName;
  }

  investorId(): string {
    return this.investor.id;
  }
}
