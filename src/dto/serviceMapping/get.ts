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
  serviceMappingDefault: Boolean | undefined,
  userId: string = "default"
): Promise<ServiceMappingWhere> => {
  const serviceMappingWhereInput = generateServiceMappingFilter(
    serviceMappingFilter,
    globalSearchConditions,
    serviceAdditionalWhere, 
    serviceMappingDefault,
    userId
  );
  return serviceMappingWhereInput;
};

export { createServiceMappingFilterInputObject };
