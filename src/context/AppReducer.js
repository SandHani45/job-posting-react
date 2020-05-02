export default (state, {
  payload, type
}) => {
    switch (type) {
      case "GET_WORK_CELL":
        return {
          ...state,
          workCellData: payload
        };
        case "GET_PANEL_SHOP":
        return {
          ...state,
          panelShop: payload
        };
        case "GET_KEY_DATA":
        return {
          ...state,
          keyData: [...state.keyData, payload]
        };
        case "GET_KEY_DATA_EMPTY":
          return {
            ...state,
            keyData: []
          };
        case "GET_WORK_ORDER":
        return {
          ...state,
          laborActivity: payload
        };
        case "GET_LABOR_CONFIRM":
          return {
            ...state,
            laborConfirm: payload
          };
        case "GET_PENDING_LABOR":
        return {
          ...state,
          pendingLabor: payload
        };
        case "GET_PENDING_LABOR_RECORD":
          return {
            ...state,
            pendingLaborRecord: payload
          };
        case "GET_START_TIME":
          return {
            ...state,
            startTime: payload
          };
        case "GET_IS_ACTIVE":
        return {
          ...state,
          isActive: payload
        };
        case "GET_LABOR_POSTING_FILTER":
          return {
            ...state,
            laborPostingFilter: payload
          };
        case "ERROR":
          return {
            ...state,
            error: payload
          };
      default:
        return state;
    }
  };