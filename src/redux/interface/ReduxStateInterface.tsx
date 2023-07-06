export interface StateProps {
    userInfoReducer:{
        declarationData:{
            title: string;
            adText: string;
            phone: string;
            city: string;
            id:string
          }[]
    }
    userPostsReducer:{
        isUserAdsPage:boolean
    }
}