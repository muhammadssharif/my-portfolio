export type DemoStep = {
  id: string;
  image: string;
};

export type Demo = {
  id: string;
  slug: string;
  caseStudyId?: string;
  steps: readonly DemoStep[];
};

export const demos: readonly Demo[] = [
  {
    id: "conservative-party",
    slug: "conservative-party",
    caseStudyId: "occ-platform",
    steps: [
      { id: "amount", image: "/demos/conservative-party/01-donation-amount.png" },
      { id: "contact", image: "/demos/conservative-party/03-contact.png" },
      { id: "payBy", image: "/demos/conservative-party/04-pay-by-options.png" },
      { id: "paymentMethod", image: "/demos/conservative-party/02-payment-method.png" },
      { id: "cardCheckout", image: "/demos/conservative-party/05-card-checkout.png" },
      { id: "interacBanks", image: "/demos/conservative-party/06-interac-banks.png" },
      { id: "etransferWaiting", image: "/demos/conservative-party/07-etransfer-waiting.png" },
      { id: "paymentDeclined", image: "/demos/conservative-party/08-payment-declined.png" }
    ]
  },
  {
    id: "bmo-allianz",
    slug: "bmo-allianz",
    caseStudyId: "pcc-sdk",
    steps: [
      { id: "reviewPayment", image: "/demos/bmo-allianz/01-review-payment.png" },
      { id: "contactInfo", image: "/demos/bmo-allianz/02-contact-info.png" },
      { id: "validationErrors", image: "/demos/bmo-allianz/08-validation-errors.png" },
      { id: "creditCard", image: "/demos/bmo-allianz/03-credit-card.png" },
      { id: "applePay", image: "/demos/bmo-allianz/04-apple-pay.png" },
      { id: "interacEtransfer", image: "/demos/bmo-allianz/05-interac-etransfer.png" },
      { id: "waitingPayment", image: "/demos/bmo-allianz/06-waiting-payment.png" },
      { id: "interacBanks", image: "/demos/bmo-allianz/07-interac-banks.png" }
    ]
  }
] as const;

export function getDemoBySlug(slug: string): Demo | undefined {
  return demos.find((demo) => demo.slug === slug);
}

export function getDemoForCaseStudy(caseStudyId: string): Demo | undefined {
  return demos.find((demo) => demo.caseStudyId === caseStudyId);
}
