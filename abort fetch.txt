export function* gete2e() {
    Components()
    let isMaster = env('ISMASTERENV');
    let result = [];
    const requesturl = `${pageParams.WebAPIURL}Master/GetE2E`;
    const controller = new AbortController();
const { signal } = controller;
    try {
        const requestDetails = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${Components['bphToken']}`,
                signal
            }
        }

   
        if (Components['auth'] === "vault") {
            result = yield call(fetch, requesturl, requestDetails);
        }
        else {
            result = yield call(adalApiFetch, fetch, requesturl, requestDetails);
        } //vaultchanges
        // setTimeout(() => controller.abort(), 2000);
        if(result.status==200){
            console.log("hu")
            let responseBody = yield result.json();
            if(responseBody && responseBody.length>0){
                yield put(actions.getE2ESuccess(responseBody))
            }
        }
    }
    catch(error){
        console.log("errr")
        yield put(actions.getE2Eerror(error))
    }finally {
        if (yield cancelled() ) {
            controller.abort()
            console.log("cancel")
        //   abortController.abort(); // Tell the browser to abort request
        }
      }
}



 let workerTask = yield takeLatest(scenarioConstant.GETE2E,scenarioComposerSagas.gete2e)
    yield takeLatest("STOP-", function* cancelWorkerSaga() {
      yield cancel(workerTask);
    });