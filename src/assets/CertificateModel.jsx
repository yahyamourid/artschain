import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator ';
import signature from './../assets/signature.png'
import { CiCircleCheck } from "react-icons/ci";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateModel = (props => {
    const { id } = useParams();
    const [hash, setHash] = useState('0xd2ebe720abc6cf83eca2e2200945b4f00b12ed4c463a1057ecccd91fcd112537')
    const artwork = props.artwork
    const urlArtWork = `http://localhost:5173/artworks/${id}`
    const urlEtherscane = `https://sepolia.etherscan.io/tx/${hash}`
    const image = `https://gateway.pinata.cloud/ipfs/${artwork.imageUrl}`
    const [imageBytecode, setImageBytecode] = useState('');
    const certificateRef = useRef(null);

    useEffect(() => {
        fetchImageBytecode()
    },[])

    const fetchImageBytecode = async () => {
        try {
            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${artwork.imageUrl}`);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                setImageBytecode('data:image/jpeg;base64,' + base64String);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error fetching image bytecode:', error);
        }
    };
    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp) * 1000);

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    }
    const handleDownloadPDF = () => {
        html2canvas(certificateRef.current, { scrollY: -window.scrollY }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg',1.0);
            const pdf = new jsPDF('l', 'mm', 'a4'); // 'l' indique le mode paysage
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            const paddingX = 20; // Padding horizontal
            const imgWidth = width - (paddingX * 2); // Largeur de l'image avec padding horizontal
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculer la hauteur proportionnellement à la largeur de l'image
    
            // Calculer les coordonnées x et y pour centrer l'image avec padding horizontal
            const x = paddingX;
            const y = (height - imgHeight) / 2;
    
            pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight, '', 'SLOW'); // Ajouter l'image centrée avec padding
            pdf.save('certificate.pdf');
        });
    };
    
    
    const handleDownloadJPG = () => {
        html2canvas(certificateRef.current).then(canvas => {
          const imgData = canvas.toDataURL('image/jpeg');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = 'certificate.jpg';
          link.click();
        });
      };
    
    
    
    return (
        <>
            <div ref={certificateRef} className='relative overflow-hidden  z-50 flex items-center justify-center h-full w-5/6 shadow-2xl shadow-zinc-500 bg-white rounded-md border border-gray-200 border-opacity-70'>
                <div className='flex flex-col z-50 items-center justify-center w-3/5 h-full p-2'>
                    <p className=' text-4xl font-bold p-2 rounded-lg tracking-wide mb-5'>Certificate of Authenticity</p>
                    <span className='flex items-center w-2/5 justify-center mb-3'>
                        <hr className="border border-black w-1/6 inline-block  " />
                        <p className='w-2/3 text-xl font-semibold text-center tracking-widest mx-1'>{artwork.artistName}</p>
                        <hr className="border border-black w-1/6 inline-block   " />
                    </span>
                    <p className="flex justify-center items-center text-center text-sm mb-4 tracking-widest">
                        This artwork is certified as an original and has been added to the blockchain by artist {artwork.artistName}.
                    </p>
                    <span className='flex justify-center items-center w-3/4 h-1/3 mb-5'>
                        <span className='flex flex-col w-1/2 tracking-wider gap-2 text-sm'>
                            <p>
                                <span className='font-bold text-zinc-900'>Title : </span>{artwork.title}
                            </p>
                            <p>
                                <span className='font-bold text-zinc-900'>Dimensions : </span>{artwork.length}cm x {artwork.width}cm
                            </p>
                            <p>
                                <span className='font-bold text-zinc-900'>Created at : </span>{formatDate(artwork.timestamp)}
                            </p>
                        </span>
                        <span className='flex justify-end items-center w-1/2 h-full '>
                            <QRCodeGenerator url={urlArtWork} />
                        </span>
                    </span>
                    <img className='h-1/6 -mt-9' src={signature} />
                    <p className='text-xs w-4/5 text-center tracking-wide '>
                        {props.hash}
                    </p>
                </div>
                <div className='flex flex-col z-50 items-end justify-center w-2/5 h-full p-5 border-l border-opacity-60'>
                <div className='flex items-center justify-center w-full h-4/5 rounded-md' style={{ backgroundImage: `url(${imageBytecode})`, backgroundSize: 'cover' }}>
                        
                        </div>
                    <p className='flex items-center mt-2 tracking-wide text-sm font-semibold text-zinc-700'><CiCircleCheck className='mr-1' /> blockchain registred</p>
                </div>
                <span className='absolute w-[180px] h-[180px] bg-opacity-40 blur-md rounded-full -top-6 -left-6  bg-pink-500 z-40'></span>
                <span className='absolute w-[150px] h-[150px] bg-opacity-40 blur-lg rounded-full top-20 -left-20  bg-sky-500 z-30'></span>
            </div>
            <span className='absolute bottom-2 flex text-xs gap-2 text-zinc-800'>
                <p>Download as </p>
                <button onClick={handleDownloadPDF} className='hover:text-pink-600'>PDF</button>
                <p> | </p>
                <button onClick={handleDownloadJPG} className='hover:text-indigo-600'>JPG</button>
            </span>
        </>
    );
});

export default CertificateModel;
