import {BN, bytes, Long, units} from '@zilliqa-js/util';
import {Zilliqa} from '@zilliqa-js/zilliqa';

const CP = require('@zilliqa-js/crypto');

class ZillicaService extends Zilliqa {
    constructor(cont) {
        super(cont);
        this.zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
        this.contract = undefined;
        this.CHAIN_ID = 333;
        this.MSG_VERSION = 1;
        this.VERSION = bytes.pack(this.CHAIN_ID, this.MSG_VERSION);
    };

    async getContract(address) {
        this.contract = await this.zilliqa.contracts.at(address);
        return this.contract;
    };

    async getContractState(contract) {
        const state = await contract.getState();
        return state;
    };

    async setMessage(message) {
        const myGasPrice = units.toQa('11000', units.Units.Li);

        try {
            const callTx = await this.contract.call(
                'setHello',
                [
                    {
                        vname: 'msg',
                        type: 'String',
                        value: message
                    }
                ],
                {
                    version: this.VERSION,
                    amount: new BN(0),
                    gasPrice: myGasPrice,
                    gasLimit: Long.fromNumber(10000)
                }
            );
            console.log(callTx);
        } catch (e) {
            console.log('failed', e);
        }

        const resp = await this.contract.getState(this.contract);
        console.log(resp);
        return resp;
    }

    async setWalltet(key) {
        this.zilliqa.wallet.addByPrivateKey(key);
        const address = CP.getAddressFromPrivateKey(key);
        console.log('Your account address is:');
        console.log(address);
        const {result} = await this.zilliqa.blockchain.getBalance(address);
        return {key, address, result};
    }
}

export default ZillicaService;
