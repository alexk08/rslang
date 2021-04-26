import React from "react";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import {Crumbs} from "../../common/navigation/crumbs";
import {ShortStatistics} from "../shortStatistics";
import {LongStatistics} from "../longStatistics";

interface StatisticsProps {
  isAuth: boolean,
}

const StatisticsRedux: React.FC<StatisticsProps> = ({isAuth}) => {
  const location = useLocation();
  return (
    <>
      <Crumbs path={location.pathname}/>
      <div className='statistic'>
        <ShortStatistics/>
        {isAuth && <LongStatistics/>}
      </div>
    </>
  )
};

const mapStateToProps = (state: any) => ({
  isAuth: state.login.isAuth,
});

const Statistics = connect(mapStateToProps)(StatisticsRedux);

export {Statistics};