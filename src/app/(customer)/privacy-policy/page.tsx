export const metadata = {
  title: "Privacy Policy | DOORA MOBILITY",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="font-space-grotesk text-5xl font-bold uppercase tracking-tighter mb-8 text-center">
        Privacy <span className="text-primary">Policy</span>
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none font-inter text-foreground/80 space-y-6">
        <p>Last updated: June 2026</p>
        <p>
          DOORA MOBILITY ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
        </p>
        <h2 className="font-space-grotesk text-2xl font-bold text-foreground">1. Data We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you including: Identity Data (name, username), Contact Data (email address, telephone numbers), and Transaction Data (details about payments and services you have purchased).
        </p>
        <h2 className="font-space-grotesk text-2xl font-bold text-foreground">2. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, or where it is necessary for our legitimate interests.
        </p>
      </div>
    </div>
  );
}
