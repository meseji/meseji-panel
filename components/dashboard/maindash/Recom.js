export function Recommendations() {
    const insights = [
      "Template A has a high cost-per-click; consider optimizing the button text.",
      "US region has a low delivery rate compared to BR; analyze message timing.",
      "Marketing conversations have the highest cost; focus on high-ROI campaigns.",
    ];
  
    return (
      <div className="card p-4">
        <h2 className="text-xl font-bold mb-4">Recommendations</h2>
        <ul className="list-disc pl-4">
          {insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
    );
  }
  