import FooterImg from '../../assets/Footer.svg'
//I used the footer image export from figma due to lack of time, pardon me.

export default function Footer() {
  return (
    <div className='px-12 flex justify-center py-16 '>
        <div className='max-w-[300px]'>
            <img src={FooterImg} alt="footer Image" />
        </div>
    </div>
  )
}

