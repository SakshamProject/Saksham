import { generateServiceMappingFilter } from "../../services/database/utils/serviceMapping/filterMapper.js";
import {
  ServiceAdditionalWhereSchemaType,
  ServiceMappingWhere,
  serviceMappingFilterType,
} from "../../types/serviceMapping/serviceMappingScreens.js";

const createServiceMappingFilterInputObject = (
  serviceMappingFilter: serviceMappingFilterType | undefined,
  globalSearchConditions: ServiceMappingWhere | null,
  serviceAdditionalWhere: ServiceAdditionalWhereSchemaType
): ServiceMappingWhere => {
  const serviceMappingWhereInput = generateServiceMappingFilter(
    serviceMappingFilter,
    globalSearchConditions,
    serviceAdditionalWhere
  );
  return serviceMappingWhereInput;
};

export { createServiceMappingFilterInputObject };
