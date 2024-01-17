/* Components */

import Button from "@/components/Button"
import Page from "@/components/Page"
import styled from "@emotion/styled"
import { useEffect } from "react"
import ListWaperItem from "../../components/ListItem"
import ValueSkeleton from "@/components/ValueSkeleton"
import { number_format } from "@/utils"
import LoaderBox from "@/components/Loader/LoaderBox"
import Pagination from "@/components/Pagination"
import { Spaced } from "@/components/Spaced"

import {
  luanchSlice,
  useSelector,
  useDispatch,
  selectLuanch,
  fetchDashboardAsync,
  fetchProjectInfoSelectInfoAsync,
  FilterTypeProps,
} from "@/lib/redux"


const HeadContainerItem: React.FC<{
  title: string
  value: any
  unit?: any
}> = ({ value, title, unit = "" }) => {
  return (
    <HeadContainerItemBox>
      <HeadContainerItemValBox>
        {value === null ? (
          <ValueSkeleton width={80} />
        ) : (
          `${unit}${number_format(value, 2)}`
        )}
      </HeadContainerItemValBox>
      <HeadContainerItemTitBox>{title}</HeadContainerItemTitBox>
    </HeadContainerItemBox>
  )
}
const ListContainerTabsItem: React.FC<{
  title: FilterTypeProps
  checkoutd: boolean
  onChange: (val: FilterTypeProps) => any
}> = ({ title, onChange, checkoutd }) => {
  return (
    <ListContainerTabsItemBox
      className={checkoutd ? "active" : ""}
      onClick={() => onChange(title)}>
      {title}
    </ListContainerTabsItemBox>
  )
}

export default function IndexPage() {
  const dispatch = useDispatch()
  const {
    dashboard,
    pageNum,
    pageSize,
    total: totalNum,
    lists: projectList,
    lists_status,
    tabType,
  } = useSelector(selectLuanch)
  const onClickTab = (tabType: FilterTypeProps) => {
    dispatch(luanchSlice.actions.setTabs(tabType))
    dispatch(fetchProjectInfoSelectInfoAsync({ pageNum: 1, pageSize, tabType }))
  }

  const getLists = (pageNum: number = 1) => {
    dispatch(fetchProjectInfoSelectInfoAsync({ pageNum, pageSize, tabType }))
  }
  const initDash = () => {
    dispatch(fetchDashboardAsync())
  }
  useEffect(() => {
    initDash()
    onClickTab('ALL')
  }, [])
  return (
    <Page>
      <HeadContainerBox>
        <HeadContainerText>
          Launch the <span>highest-quality</span> projects to match the{" "}
          <span>most suitable</span> investments
        </HeadContainerText>
        <HeadContainerBlockBox>
          <HeadContainerItem
            title="Total Projects"
            value={dashboard.projectCount}
          />
          <HeadContainerItem
            unit={"$"}
            title="Total Liquidity Rais"
            value={dashboard.raisedCount}
          />
          <HeadContainerItem title="Total Users" value={dashboard.usersCount} />
        </HeadContainerBlockBox>
        <HeadContainerApplyBox>
          <HeadContainerApplyButton onClick={() => {}}>
            Apply to launch
          </HeadContainerApplyButton>
        </HeadContainerApplyBox>
      </HeadContainerBox>

      <ListContainerBox>
        <ListContainerTabsBox>
          <ListContainerTabsItem
            onChange={onClickTab}
            checkoutd={tabType === "ALL"}
            title="ALL"
          />
          <ListContainerTabsItem
            onChange={onClickTab}
            checkoutd={tabType === "FT"}
            title="FT"
          />
          <ListContainerTabsItem
            onChange={onClickTab}
            checkoutd={tabType === "NFT"}
            title="NFT"
          />
        </ListContainerTabsBox>
        <ListWaperBox loading={lists_status === "loading"}>
          {projectList === null ? <ListWaperItem item={null} />:projectList.filter(itm=>!!itm.projecthead && !!itm.projectlogo).map((item, key) => (
            <ListWaperItem item={item} key={key} />
          ))}
        </ListWaperBox>
      </ListContainerBox>
      <Spaced size="50" />
      {totalNum > 10 ? <Pagination total={totalNum} onChange={getLists} page={pageNum} />:''}
    </Page>
  )
}

const ListWaperBox = styled(LoaderBox)`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`
const ListContainerTabsItemBox = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #f7931a;
  }
  &.active {
    color: #f7931a;
    &::after {
      content: "";
      position: absolute;
      width: 36px;
      height: 5px;
      background-color: #f7931a;
      bottom: -18px;
      left: 50%;
      border-radius: 3px;
      transform: translateX(-50%);
    }
  }
`
const ListContainerTabsBox = styled.div`
  color: #fff;
  font-size: 60px;
  font-weight: 600;
  width: 465px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ListContainerBox = styled.div`
  margin: 140px auto 0;
`
const HeadContainerApplyButton = styled(Button)`
  width: 280px;
  height: 80px;
`
const HeadContainerApplyBox = styled.div`
  text-align: center;
  margin-top: 64px;
`
const HeadContainerBox = styled.div`
  margin-top: 145px;
`
const HeadContainerText = styled.div`
  font-size: 60px;
  line-height: 80px;
  font-family: Arial Black;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 1px;
  text-align: center;
  span {
    color: #f8931a;
  }
`
const HeadContainerBlockBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 960px;
  margin: 80px auto 0;
`
const HeadContainerItemBox = styled.div`
  text-align: center;
  width: 280px;
  height: 160px;
  background: #181b20;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const HeadContainerItemTitBox = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: #6f6f76;
`
const HeadContainerItemValBox = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
`
