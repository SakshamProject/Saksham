import {
  ServicesIds,
  SevaKendraRequestSchemaType,
  SevaKendraServices,
  SevaKendraUpdateRequestSchemaType,
} from "../../../types/sevaKendra/sevaKendra.js";

const updateServicesOnSevaKendras = (
  existingServices: SevaKendraServices | undefined | null,
  updateRequestSevaKendra: SevaKendraUpdateRequestSchemaType
) => {
  const existingServicesId =
    existingServices?.services.map((service) => service.serviceId) || [];
  const currentServicesId = updateRequestSevaKendra.servicesBySevaKendra.map(
    (service) => service.serviceId
  );
  // console.log({ existingServices, existingServicesId, currentServicesId });
  const servicesToCreate = currentServicesId
    .filter((serviceId) => !existingServicesId.includes(serviceId))
    .map<ServicesIds>((id) => {
      return { serviceId: id };
    });
  const servicesToDelete = existingServicesId.filter(
    (serviceId) => !currentServicesId.includes(serviceId)
  );

  return { servicesToCreate, servicesToDelete };
};

export { updateServicesOnSevaKendras };
