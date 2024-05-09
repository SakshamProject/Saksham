import { generateServiceMappingFilter } from "../../services/database/utils/serviceMapping/filterMapper.js";
import {
  ServiceAdditionalWhereSchemaType,
  ServiceMappingWhere,
  serviceMappingFilterType,
} from "../../types/serviceMapping/serviceMappingScreens.js";

const createServiceMappingFilterInputObject = async (
  serviceMappingFilter: serviceMappingFilterType | undefined,
  globalSearchConditions: ServiceMappingWhere | null,
  serviceAdditionalWhere: ServiceAdditionalWhereSchemaType | undefined,
  token: Token | undefined
): Promise<ServiceMappingWhere> => {
  const serviceMappingWhereInput = generateServiceMappingFilter(
    serviceMappingFilter,
    globalSearchConditions,
    serviceAdditionalWhere,
    token
  );
  return serviceMappingWhereInput;
};

export { createServiceMappingFilterInputObject };
