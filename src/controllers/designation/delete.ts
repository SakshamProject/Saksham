async function deleteDesignation(request:Request, response:Response){

    const id: string = request.params.id;
    const deletedDesignation:Designation = await deleteDesignationDB(id);
    response.send(deletedDesignation);
  }
  
  async function putDesignation(request:Request, response:Response){
    const id:string = request.params.id;
    const body = getRequestSchema.parse(request.body);
   
  }