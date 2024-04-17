const sevaKendraDefaults = {
  description: "SevaKendra is started",
  date: new Date(Date.now()).toISOString(),
  //2024-04-05T13:30:00Z  ISO-8601 DateTime
};

enum SevaKendraColumnNamesEnum {
  NAME = "sevaKendraName",
  STATE = "state",
  DISTRICT = "district",
  CONTACTNAME = "contactPersonName",
  CONTACTNUMBER = "contactPersonNumber",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}
export { sevaKendraDefaults, SevaKendraColumnNamesEnum };
