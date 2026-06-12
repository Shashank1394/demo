import { JSX } from "react";

interface ServiceItem {
  id: string;
  name: string;
  displayName: string;
  url: string;
  fields: {
    Title?: {
      value?: string;
    };
    Description?: {
      value?: string;
    };
  };
}

type ServicesProps = {
  fields?: {
    items?: ServiceItem[];
  };
};

const Services = ({ fields }: ServicesProps): JSX.Element => {
  const services = fields?.items ?? [];

  if (services.length === 0) {
    return <div>No services found.</div>;
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <h3 className="mb-3 text-2xl font-bold">
                {service.fields?.Title?.value}
              </h3>

              <p className="text-gray-600">
                {service.fields?.Description?.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
