/* Components */

import Button from "@/components/Button";
import styled from "@emotion/styled";
import ArrowLeftIcon from "@/components/Svg/ArrowLeftIcon";
import { useRouter } from "next/navigation";
import React from "react";
import ValueSkeleton from "@/components/ValueSkeleton";

const DetailTitle: React.FC<{ title: any }> = ({ title }) => {
  const { back } = useRouter();
  return (
    <HeadContainerBox>
      <HeadBackButtonBox onClick={back}>
        {title === null ? (
          <ValueSkeleton width={800} height={40} />
        ) : (
          <>
            <ArrowLeftIcon width={63} fill="#DBDBDB" />
            <span>{title}</span>
          </>
        )}
      </HeadBackButtonBox>
    </HeadContainerBox>
  );
};
export default DetailTitle;
const HeadBackButtonBox = styled(Button)`
  background-color: transparent;
  width: auto;
  font-size: 40px;
  font-weight: 600;
  min-height: 40px;
  color: #dbdbdb;
  line-height: 40px;
  &:hover {
    color: #f8931a;
    svg {
      fill: #f8931a;
    }
    background: transparent;
  }
  gap: 36px;
`;
const HeadContainerBox = styled.div`
  margin: 75px auto 0px;
`;
