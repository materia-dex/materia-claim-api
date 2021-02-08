const ropstenMerkleTree = require("../resources/ropsten/merkle-tree.json");
const mainneterkleTree = require("../resources/mainnet/merkle-tree.json");
const Chains = Object.freeze({
    MAINNET: "1",
    ROPSTEN: "3"
});

module.exports = function (app, module, apiPath) {
    app.get(apiPath + "/merkletree/:chainId", (request, response, next) => {
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

    app.get(apiPath + "/merkletree/root/:chainId", (request, response, next) => {
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

    app.get(apiPath + "/data/:chainId/:address", (request, response, next) => {
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
};