const express = require("express");
const app = express();
const port = 80

app.get("/api/system/ping", (request, response, next) => {
    response.status(200).send({
        status: 200,
        message: "success",
        data: "pong"
    });
});

const ropstenMerkleTree = require("./resources/ropsten/merkle-tree.json");
const mainneterkleTree = require("./resources/mainnet/merkle-tree.json");
const Chains = Object.freeze({
    MAINNET: "1",
    ROPSTEN: "3"
});

app.get("/api/claim/merkletree/:chainId", (request, response, next) => {
    const chainId = request.params.chainId;
    
    let merkleTree = null;

    switch (chainId) {
        case Chains.ROPSTEN:
            merkleTree = ropstenMerkleTree;
            break;
        case Chains.MAINNET:
            merkleTree = mainneterkleTree;
            break;
        default:
            break;
    }

    response.status(200).send({
        status: 200,
        message: "success",
        data: merkleTree
    });
});

app.get("/api/claim/merkletree/root/:chainId", (request, response, next) => {
    const chainId = request.params.chainId;
    
    let merkleRoot = null;

    switch (chainId) {
        case Chains.ROPSTEN:
            merkleRoot = ropstenMerkleTree.merkleRoot;
            break;
        case Chains.MAINNET:
            merkleRoot = mainneterkleTree.merkleRoot;
            break;
        default:
            break;
    }

    response.status(200).send({
        status: 200,
        message: "success",
        data: merkleRoot
    });
});

app.get("/api/claim/data/:chainId/:address", (request, response, next) => {
    const chainId = request.params.chainId;
    const address = request.params.address;

    let addressClaims = null;

    switch (chainId) {
        case Chains.ROPSTEN:
            addressClaims = ropstenMerkleTree.claims[address];
            break;
        case Chains.MAINNET:
            addressClaims = mainneterkleTree.claims[address];
            break;
        default:
            break;
    }

    response.status(200).send({
        status: 200,
        message: "success",
        data: addressClaims
    });
});

app.use(function (error, request, response, next) {
    response.status(500).send({
        status: 500,
        message: "error",
        data: error.message
    });
});

app.use(function (request, response, next) {
    response.status(404).send({
        status: 404,
        message: "error",
        data: "not found"
    });
});

app.listen(port);