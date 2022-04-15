import md5 = require('md5')
import * as https       from 'https'
import * as querystring from 'querystring'
import privateDetail    from './private'

export default ( options: any ) => {
  const url = getUrl( options )

  https.get( url, ( res ) => {
    let chunks: Buffer[] = []

    res.on( 'data', ( chunk ) => {
      chunks.push( chunk )
    } )

    res.on( 'end', () => {
      const resultString = Buffer.concat( chunks ).toString()
      const result       = JSON.parse( resultString )
      if ( !result.error_code ) {
        const source = result.trans_result.map( ( item: any ) => item.src ).join( ', ' )
        const dest   = result.trans_result.map( ( item: any ) => item.dst ).join( ', ' )
        console.info( `${ source } => ${ dest }` )
      } else {
        const { error_code, error_msg } = result
        const error                     = `error => ${ error_code }：${ error_msg }`
        console.error( error )
      }
    } )

  } ).on( 'error', ( e ) => {
    console.error( 'error：', e )
  } )
}

// @ts-ignore
const getUrl = ( { args, lang } ) => {
  const { appId, cipher } = privateDetail
  const baseUrl           = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
  const query             = args.join( ' ' )
  const salt              = Math.random()
  const sign              = md5( `${ appId }${ query }${ salt }${ cipher }` )
  const search            = querystring.stringify( {
    q    : query,
    from : 'auto',
    to   : lang,
    appid: appId,
    salt,
    sign
  } )
  return `${ baseUrl }?${ search }`
}