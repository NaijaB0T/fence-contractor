// src/components/contractors/BusinessSummary.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BusinessSummaryProps {
  summary: string | undefined;
}

const BusinessSummary = ({ summary }: BusinessSummaryProps) => {
  if (!summary) {
    return null; // Or a fallback message if you prefer
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fence Contractor Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
};

export default BusinessSummary;