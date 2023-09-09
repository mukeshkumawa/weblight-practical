import niv from "node-input-validator"

export async function adminRegister(req, res, next) {
    const objValidation = new niv.Validator(req.body, {
        name: "required|maxLength:50",
        email: "required|email|maxLength:50",
        password: "required|minLength:6|maxLength:12",
    })
    const matched = await objValidation.check()

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors })
    } else {
        next();
    }
}

export async function adminLogin(req, res, next) {
    const objValidation = new niv.Validator(req.body, {
        email: "required|email",
        password: "required",
    });
    const matched = await objValidation.check()

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors })
    } else {
        next()
    }
}

export async function customerRegister(req, res, next) {
    const objValidation = new niv.Validator(req.body, {
        name: "required|maxLength:50",
        email: "required|email|maxLength:50",
        password: "required|minLength:6|maxLength:12",
    })
    const matched = await objValidation.check()

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors })
    } else {
        next();
    }
}

export async function customerLogin(req, res, next) {
    const objValidation = new niv.Validator(req.body, {
        email: "required|email",
        password: "required",
    });
    const matched = await objValidation.check()

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors })
    } else {
        next()
    }
}

export async function getAllCustomer(req, res, next) {
    const objValidation = new niv.Validator(req.query, {
        type: "required|integer|in:1,2,3"
    });
    const matched = await objValidation.check()

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors })
    } else {
        next()
    }
}

export async function categoryValidation(req, res, next) {
    const objValidation = new niv.Validator(req.body, {
        name: "required|minLength:3|maxLength:50"
    })
    const matched = await objValidation.check()

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors })
    } else {
        next();
    }
}

export async function productValidation(req, res, next) {
    const objValidation = new niv.Validator(req.body, {
        categories: "required",
        product_name: "required|minLength:3|maxLength:150",
        price: "required|numeric"
    })
    const matched = await objValidation.check()

    if (!matched) {
        return res
            .status(422)
            .send({ message: "Validation error", errors: objValidation.errors })
    } else {
        next();
    }
}