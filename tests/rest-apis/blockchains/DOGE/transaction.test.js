async function Transaction(caClient) {
    console.log('\n::DOGE Transaction');

    const chainInfo = await caClient.blockchain.DOGE.blockchain.getInfo().then(response => response.payload); // Duplicated but needed for scenario
    const transactions = await caClient.blockchain.DOGE.transaction.getTransactionIndexByBlock(chainInfo.bestBlockHash).then(response => response.payload);

    if (transactions && transactions.length) {
        const txId = transactions[0].txid;
        await caClient.blockchain.DOGE.transaction.getTransaction(txId);
    }

    await caClient.blockchain.DOGE.transaction.getUnconfirmedTransactions();
    await caClient.blockchain.DOGE.transaction.getTransactionsFee();

    const txHex = '02000000014bb184e7f4e2d1b8667ed2f55eef37d2d1f95ca3930529e2f49966e3ba473db200000000fdfd000047304402201f6b5a37a5c379060051ff7fa4bd101f8c43e67ef4befd230cd37cf8ade6446f022060ed53714760e0bd5584134d65abefbadb1afc694306835beb777c5e2ca275c341483045022100dc78ea13d5812a081c326bea5f26fb12d1b9c6b24d48ecc2d6e496b4e93fd08602207f0acfc2d37dff80ecabac906eba260c53d5639f79bc375c0987c61d7c4b64d7414c69522103fb5db1d7f699f2282d38450852263ba7b3ea96e50ae682d39980b1ee8babbc6b2102252c47df4dfbdfc39502a6e8cc1657976787f9d16a3bfcef3c079088155c7ad121028db76957428e033260219629078afb2c29bbcd41e4fe20ca58271f51a487d0a653aeffffffff02102700000000000017a9149264316a701cbd27ed2e14b8767c920a7e349cb487221f5f040000000017a9148978c4d39e167b0a1a5c6a8092ed46ad4bae27b88771111400';
    await caClient.blockchain.DOGE.transaction.decodeRawTransaction(txHex).then(response => response.payload);

    const txIns = [{address: 'no3yJMxBSKzq6wuUNLN7cUssfPGTiRbb5c', value: 121.309}];
    const txOuts = [{address: 'nsXYgWCuBVSYxD1rWz543EFkfxcPV9PC2y', value: 121.309}];
    const fee = {value: 0.00000001};

    await caClient.blockchain.DOGE.transaction.createTransaction(txIns, txOuts, fee);
    // await caClient.blockchain.DOGE.transaction.signTransaction(); // TODO
    // await caClient.blockchain.DOGE.transaction.sendTransaction(); // TODO
    // await caClient.blockchain.DOGE.transaction.newTransaction();
    // await caClient.blockchain.DOGE.transaction.createHDWalletTransaction(); // TODO
}


module.exports = Transaction;
