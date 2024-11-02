function getContracts(empresa, inicio) {
    const repository = new Repository();
    const query = `Select * from contracts Where empresa = '${empresa}' And data_inicio = '${inicio}'`;
    const result = repository.execute(query);
    return result;
};

module.exports = { getContracts };