import { Button } from "@/components/ui/Button";

const processSteps = [
  { title: "Sourcing", text: "Selected From Trusted Egyptian Farms.", icon: "process-icon-1.png" },
  { title: "Sorting", text: "Checked And Graded For Export Quality.", icon: "process-icon-2.png" },
  { title: "Packaging", text: "Packed Carefully To Preserve Freshness.", icon: "process-icon-3.png" },
  { title: "Shipping", text: "Delivered To Global Markets On Time.", icon: "process-icon-4.png" },
];

export function ProcessPreview({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <section className={`process-wrap ${horizontal ? "process-horizontal" : ""}`}>
      <div className="shell">
        <div className="section-title-center-lines">
          <span>Quality</span>
          <strong>Process Preview</strong>
        </div>
        
        <div className="process-layout-new">
          <div className="shipment-card">
            <h3>From Farm<br /><strong>To Shipment</strong></h3>
            <p>A controlled process that keeps every product fresh, safe, and export-ready.</p>
            <div className="shipment-actions">
              <Button href="/products">Explore Products</Button>
              <Button href="#contact" variant="light">Request a Quote</Button>
            </div>
          </div>
          
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-icon">
                  <img src={`/images/process/${step.icon}`} alt={step.title} />
                </div>
                <div className="timeline-content">
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
