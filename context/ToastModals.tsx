import { useEffect } from "react";

import {
  useSelector,
  useDispatch,
  selectToast,
  ToastItem,
  toastSlice,
} from "@/lib/redux";
import styled from "@emotion/styled";
import Notice from "@/components/Notice";
export default function ToastModals() {
  const { lists } = useSelector(selectToast);
  return lists.length ? (
    <ToastContainerBox>
      <Fiext>
        {lists.map((item, key) => (
          <ToastItemDom item={item} key={key} />
        ))}
      </Fiext>
    </ToastContainerBox>
  ) : (
    <></>
  );
}

const ToastItemDom: React.FC<{ item: ToastItem }> = ({ item }) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fun = () => {
      dispatch(toastSlice.actions.removeToast(item.uniqueId || ""));
    };
    window.addEventListener("click", fun);
    return window.removeEventListener("click", fun);
  }, [])

  return (
    <ToastItemBox>
      <ToastItemContxtBox>
        <Notice icon={item.icon} text={item.contxt} />
      </ToastItemContxtBox>
      {item.noTime ? '':<ToastItemFooterBox>
        <ToastIner second={(item.endTime || 0) - Date.now() + 800} />
      </ToastItemFooterBox>}
    </ToastItemBox>
  )
}
const Fiext = styled.div`
  position: fixed;
  top: 100px;
  transform: translateX(-100%);
  z-index: 100;
`;
const ToastContainerBox = styled.div`
  position: absolute;
  right: 0px;
  top: 100px;
`;
const ToastItemBox = styled.div`
  width: 430px;
  min-height: 130px;
  background: #24272b;
  border-radius: 24px;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 10px;
  padding-left: 24px;
  padding-right: 24px;
`;
const ToastItemContxtBox = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  line-height: 32px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 20px;
`;
const ToastItemHeadBox = styled.div``;
const ToastItemFooterBox = styled.div`
  height: 5px;
  background: #181b20;
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 10px;
`;
const ToastIner = styled.div<{ second: number }>`
  height: 5px;
  background: linear-gradient(90deg, #d87600 0%, #f38f17 78%, #ffbf49 100%);
  border-radius: 12px;
  animation: progress-animation ${({ second }) => second / 1000}s ease; /* 动画名称、时长、缓动函数和无限重复 */
  /* 进度条动画 */
  @keyframes progress-animation {
    100% {
      width: 0%;
    }
    /* 50% {
      width: 50%;
    } */
    0% {
      width: 100%;
    }
  }
`;
