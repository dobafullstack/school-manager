const getFieldName = (entity: String) => {
    const lastChar = entity[entity.length - 1];

    if (lastChar === 'y'){
        return `${entity.slice(0, entity.length - 1)}ies`.toLowerCase()
    }else{
        return `${entity}s`.toLowerCase();
    }
}

export default getFieldName;