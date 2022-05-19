import React from 'react';
import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../images/logo.png';

const NavBarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {['About', 'Manual', 'Wallets'].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                ))}
                <li className='bg-[#00f895] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#10ebf9]'>
                    Login
                </li>
            </ul>  
            <div className='flex relative'>
                {toggleMenu
                ? <AiOutlineClose frontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu (folse)} />
                : <HiMenuAlt4 frontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu (true)}/>
                }
                {toggleMenu && (
                    <ul>
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        {['About', 'Manual', 'Wallets'].map((item, index) => (
                            <NavBarItem key={item + index} title={item} classProps='my-2 text-lg'/>
                        ))} 
                    </ul>
                )}
            </div>  
        </nav>
    )
}

export default Navbar;