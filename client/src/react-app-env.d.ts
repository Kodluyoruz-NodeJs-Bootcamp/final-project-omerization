/// <reference types="react-scripts" />

interface GoogleRes {
    profileObj: object,
    tokenId: string;
}

interface AuthToken {
    name: string;
    exp: number;
    user: Object;
}

enum ActionType {
    AUTH = 'AUTH',
    LOGOUT = 'LOGOUT',

    CREATE_FAVORITE = 'CREATE_FAVORITE',
    CREATE_MOVIE = 'CREATE_MOVIE',
    CREATE_ACTOR = 'CREATE_ACTOR',
    GET_USER_MOVIES = 'GET_USER_MOVIES',
    GET_USER_ACTORS = 'GET_USER_ACTORS',
    GET_FAVORITE_BY_ID = 'GET_FAVORITE_BY_ID',

    CREATE_COMMENT = 'CREATE_COMMENT',
    GET_COMMENTS_BY_POSTID= 'GET_COMMENTS_BY_POSTID',

    CREATE_POST = 'CREATE_POST',
    UPDATE_POST = 'UPDATE_POST',
    LIKE_POST = 'LIKE_POST',
    DELETE_POST = 'DELETE_POST',
    FETCH_ALL_POSTS = 'FETCH_ALL_POSTS',
    GET_POST_BY_ID = 'GET_POST_BY_ID'
}

interface actionAuth {
    type: ActionType.AUTH | ActionType.LOGOUT ;
    data: Object;
}

interface actionFavorites {
    type: ActionType.CREATE_FAVORITE | ActionType.FETCH_ALL | 
    ActionType.GET_USER_FAVORITES | ActionType.CREATE_MOVIE | 
    ActionType.CREATE_ACTOR | ActionType.GET_USER_MOVIES | 
    ActionType.GET_USER_ACTORS |   ActionType.GET_FAVORITE_BY_ID ;
    data: Array;
}

interface actionPosts {
    type: ActionType.CREATE_POST | ActionType.UPDATE_POST | ActionType.DELETE_POST | ActionType.LIKE_POST | ActionType.FETCH_ALL_POSTS | ActionType.GET_POST_BY_ID
    data: Array;
}

interface actionComments {
    type: ActionType.CREATE_COMMENT |  ActionType.GET_COMMENTS_BY_POSTID
    data: Array;
}


interface DefaultRootState {
    favorites: Array
}

interface FavoriteProps {
    name: String,
    image:String,
    userId:String,
    favorite:Object,
    owner:String,
    handleUpdate:any
    handleDelete:any
}


interface OnlyUserProps {
    user: any
}



interface PostProps {
    review: String,
}

interface LandingProps {
    message?: String,
    loggedIn?: any
}

interface PostCardProps {
    name: String,
    image:String,
}
interface AddFavoriteProps {
    handleCancel: Function,
}
interface UpdateFavoriteProps {
    handleCancel: Function,
    favoriteToUpdate: any
}


interface ActorFormProps {
    handleCancel: Function,
    isActorFormVisible: Boolean
}

interface MovieFormProps {
    handleCancel: Function,
    isMovieFormVisible: Boolean,
    user:any,
    handleCancel:any
}


interface ActorFormProps {
    handleCancel: Function,
    isActorFormVisible: Boolean,
    user:any,
    handleCancel:any
}

interface UserProps {
    user:any,
    logout:any
}


interface CommentProps {
    user:any,
    postId: String | undefined
}

interface SharePostProps {
    user:any,
    logout:any,
    handleCancel:any
}

interface UpdatePostProps {
    postToUpdate: any,
    favorite:any
    handleCancel:any
}

declare module 'react-facebook-login/dist/facebook-login-render-props' {
    export interface RenderProps {
      onClick:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
      isDisabled: boolean;
      isProcessing: boolean;
      isSdkLoaded: boolean;
    }
  
    interface ReactFacebookLoginProps {
      appId: string;
      callback(userInfo: ReactFacebookLoginInfo): void;
      onFailure?(response: ReactFacebookFailureResponse): void;
  
      autoLoad?: boolean;
      buttonStyle?: React.CSSProperties;
      containerStyle?: React.CSSProperties;
      cookie?: boolean;
      cssClass?: string;
      disableMobileRedirect?: boolean;
      fields?: string;
      icon?: string | React.ReactNode;
      isDisabled?: boolean;
      language?: string;
      onClick?(event: React.MouseEvent<HTMLDivElement>): void;
      reAuthenticate?: boolean;
      redirectUri?: string;
      scope?: string;
      size?: 'small' | 'medium' | 'metro';
      textButton?: string;
      typeButton?: string;
      version?: string;
      xfbml?: boolean;
      isMobile?: boolean;
      tag?: Node | React.Component<any>;
      render(props: RenderProps): void;
    }
  
    interface ReactFacebookFailureResponse {
      status?: string;
    }
  
    interface ReactFacebookLoginInfo {
      id: string;
      accessToken: string;
      name?: string;
      email?: string;
    }
  
    interface ReactFacebookLoginState {
      isSdkLoaded?: boolean;
      isProcessing?: boolean;
    }
  
    export default class ReactFacebookLogin extends React.Component<
      ReactFacebookLoginProps,
      ReactFacebookLoginState
    > {}
  }


module 'react-file-base64';