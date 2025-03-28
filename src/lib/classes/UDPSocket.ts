import dgram from 'dgram'

export class UDPSocket {
  private client: dgram.Socket
  private serverHost: string
  private serverPort: number

  constructor(serverHost: string, serverPort: number) {
    this.client = dgram.createSocket('udp4')
    this.serverHost = serverHost
    this.serverPort = serverPort
  }

  private closeConnection = () => this.client.close()

  send = (msg: string) => {
    this.client.send(msg, this.serverPort, this.serverHost, (err) => {
      if (err) throw new Error(err.message)

      this.closeConnection()
    })
  }
}
