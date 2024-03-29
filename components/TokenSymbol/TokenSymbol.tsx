import styled from "@emotion/styled"
import Image from "next/image"
import BitcoinIcon from '@/assets/symbol/bitcoin.png'

export const logosBySymbol: { [symbol: string]: any } = {
  "BIT": BitcoinIcon,
  "BITCOIN": BitcoinIcon,
  "BTC": BitcoinIcon,
  "BitMatch OG":BitcoinIcon
}

export const getTokenSymbol = (symbol: string) => {
  if (!logosBySymbol[symbol]) {
    // throw new Error(`Invalid RabbitLogo symbol: ${symbol}`);
    return null 
  }
  return logosBySymbol[symbol]
}
const ChainIcons: React.FC<{ symbol: string; size?: number }> = ({
  symbol,
  size = 50,
}) => {
  const icon = getTokenSymbol(symbol?.toLocaleUpperCase())
  if(icon){
    return <ImgBox src={icon} alt={`${symbol} icon`} width={size} />
  }
  return ''
}

export default ChainIcons
const ImgBox = styled(Image)`
  height: auto;
  user-select:none;
`