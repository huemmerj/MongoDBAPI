
export enum HttpStatusCode {

    /**
     * The server has received the request headers and the client should proceed to send the request body
     * (in the case of a request for which a body needs to be sent; for example, a POST request).
     * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.
     * To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request
     * and receive a 100 Continue status code in response before sending the body. The response 417 Expectation Failed indicates the request should not be continued.
     */
    CONTINUE = 100,

    /**
     * The requester has asked the server to switch protocols and the server has agreed to do so.
     */
    SWITCHING_PROTOCOLS = 101,

    /**
     * A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request.
     * This code indicates that the server has received and is processing the request, but no response is available yet.
     * This prevents the client from timing out and assuming the request was lost.
     */
    PROCESSING = 102,

    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
    OK = 200,

    /**
     * The request has been fulfilled, resulting in the creation of a new resource.
     */
    CREATED = 201,

    /**
     * The request has been accepted for processing, but the processing has not been completed.
     * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
     */
    ACCEPTED = 202,

    /**
     * SINCE HTTP/1.1
     * The server is a transforming proxy that received a 200 OK from its origin,
     * but is returning a modified version of the origin's response.
     */
    NON_AUTHORITATIVE_INFORMATION = 203,

    /**
     * The server successfully processed the request and is not returning any content.
     */
    NO_CONTENT = 204,

    /**
     * The server successfully processed the request, but is not returning any content.
     * Unlike a 204 response, this response requires that the requester reset the document view.
     */
    RESET_CONTENT = 205,

    /**
     * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
     * The range header is used by HTTP clients to enable resuming of interrupted downloads,
     * or split a download into multiple simultaneous streams.
     */
    PARTIAL_CONTENT = 206,

    /**
     * The message body that follows is an XML message and can contain a number of separate response codes,
     * depending on how many sub-requests were made.
     */
    MULTI_STATUS = 207,

    /**
     * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
     * and are not being included again.
     */
    ALREADY_REPORTED = 208,

    /**
     * The server has fulfilled a request for the resource,
     * and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
     */
    IM_USED = 226,

    /**
     * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).
     * For example, this code could be used to present multiple video format options,
     * to list files with different filename extensions, or to suggest word-sense disambiguation.
     */
    MULTIPLE_CHOICES = 300,

    /**
     * This and all future requests should be directed to the given URI.
     */
    MOVED_PERMANENTLY = 301,

    /**
     * This is an example of industry practice contradicting the standard.
     * The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect
     * (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302
     * with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307
     * to distinguish between the two behaviours. However, some Web applications and frameworks
     * use the 302 status code as if it were the 303.
     */
    FOUND = 302,

    /**
     * SINCE HTTP/1.1
     * The response to the request can be found under another URI using a GET method.
     * When received in response to a POST (or PUT/DELETE), the client should presume that
     * the server has received the data and should issue a redirect with a separate GET message.
     */
    SEE_OTHER = 303,

    /**
     * Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.
     * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.
     */
    NOT_MODIFIED = 304,

    /**
     * SINCE HTTP/1.1
     * The requested resource is available only through a proxy, the address for which is provided in the response.
     * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.
     */
    USE_PROXY = 305,

    /**
     * No longer used. Originally meant "Subsequent requests should use the specified proxy."
     */
    SWITCH_PROXY = 306,

    /**
     * SINCE HTTP/1.1
     * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
     * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.
     * For example, a POST request should be repeated using another POST request.
     */
    TEMPORARY_REDIRECT = 307,

    /**
     * The request and all future requests should be repeated using another URI.
     * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.
     * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
     */
    PERMANENT_REDIRECT = 308,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,

    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511
}