import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionsProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }));

    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();
        
                const availableTransactions = await transactionsContract.getAllTransactions();
        
                const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));
        
                console.log(structuredTransactions);
        
                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
          console.log(error);
        }
    };

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
    
            const accounts = await ethereum.request({ method: "eth_accounts" });
    
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
          console.log(error);
        }
        
    };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install Metamask');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts', });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object.');
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install Metamask');

            const { addressTo, amount, keyword, message} = formData;
            getEthereumContract();
        } catch (error) {
            console.log(error);

            throw new Error('No ethereum object.');
        }
    }

    useEffect(() => {
        checkIfWalletIsConnect();
    }, []); 

    return(
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            { children }
        </TransactionContext.Provider>
    );

};